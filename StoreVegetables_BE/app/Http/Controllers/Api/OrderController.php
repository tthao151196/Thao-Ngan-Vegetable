<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\OrderDetail;

class OrderController extends Controller
{
    // ========== Helpers ánh xạ trạng thái ==========
    // 0|1|2 -> (status_step, step_code)
    private function intToStep(int $status): array
    {
        return match ($status) {
            1 => ['delivered', 4],  // Completed
            2 => ['canceled',  0],  // Cancelled
            default => ['pending', 0], // Pending
        };
    }

    // Hợp nhất: nếu có step/code thì suy ra 0|1|2
    private function mergeStatus(?int $status, ?string $step, ?int $code): int
    {
        // Nếu cột status đã set thì ưu tiên nó
        if ($status !== null) return (int) $status;

        $s = strtolower((string) $step);
        if (in_array($s, ['canceled', 'cancelled'], true)) return 2;
        if ($code === 4 || in_array($s, ['delivered', 'success', 'completed'], true)) return 1;
        return 0;
    }

    // ========== Actions ==========

    public function checkout(Request $request)
    {
        $data = $request->validate([
            'customer_name'   => 'required|string|max:100',
            'phone'           => 'required|string|max:20',
            'address'         => 'required|string|max:255',
            'email'           => 'required|email|max:255',
            'items'           => 'required|array|min:1',
            'items.*.id'      => 'required|integer',
            'items.*.name'    => 'required|string',
            'items.*.price'   => 'required|numeric',
            'items.*.qty'     => 'required|integer|min:1',
        ]);

        $total = collect($data['items'])->sum(fn ($i) => $i['price'] * $i['qty']);

        $order = Order::create([
            'name'        => $data['customer_name'],
            'phone'       => $data['phone'],
            'email'       => $data['email'],
            'address'     => $data['address'],
            'user_id'     => Auth::id() ?? null,
            'status'      => 0,            // pending
            'status_step' => 'pending',    // 👈 đồng bộ step
            'step_code'   => 0,            // 👈 đồng bộ code
            'note'        => "Tổng đơn: {$total} đ",
        ]);

        $createdItems = [];
        foreach ($data['items'] as $item) {
            $detail = OrderDetail::create([
                'order_id'   => $order->id,
                'product_id' => $item['id'],
                'price_buy'  => $item['price'],
                'qty'        => $item['qty'],
                'amount'     => $item['price'] * $item['qty'],
            ]);

            $createdItems[] = [
                'order_detail_id' => $detail->id,
                'product_id'      => $detail->product_id,
                'price'           => (float) $detail->price_buy,
                'qty'             => (int) $detail->qty,
                'subtotal'        => (float) $detail->amount,
            ];
        }

        return response()->json([
            'message'   => 'Đặt hàng thành công',
            'id'        => $order->id,
            'order_id'  => $order->id,
            'user_id'   => $order->user_id,
            'total'     => (float) $total,
            'status'    => (int) $order->status,
            'items'     => $createdItems,
        ]);
    }

    public function index(Request $request)
    {
        $status   = $request->integer('status', null);
        $search   = (string) $request->get('search', '');
        $perPage  = max(1, min(100, (int) $request->get('per_page', 20)));

        $q = Order::query()
            ->withCount('details')
            ->withSum('details as total', 'amount');

        if (!is_null($status)) {
            // vẫn cho phép lọc theo cột status hiện có
            $q->where('status', $status);
        }

        if ($search !== '') {
            $q->where(function ($qq) use ($search) {
                $qq->where('name', 'like', "%{$search}%")
                   ->orWhere('phone', 'like', "%{$search}%")
                   ->orWhere('email', 'like', "%{$search}%")
                   ->orWhere('id', $search);
            });
        }

        $orders = $q->latest('id')->paginate($perPage)->through(function ($o) {
            $statusInt = $this->mergeStatus($o->status, $o->status_step, $o->step_code);
            return [
                'id'            => $o->id,
                'name'          => $o->name,
                'email'         => $o->email,
                'phone'         => $o->phone,
                'address'       => $o->address,
                'status'        => $statusInt,          // 👈 luôn đồng nhất cho FE
                'status_int'    => $statusInt,
                'status_step'   => $o->status_step,     // (optional) để kiểm tra
                'step_code'     => (int) $o->step_code, // (optional) để kiểm tra
                'details_count' => $o->details_count,
                'total'         => (float) ($o->total ?? 0),
                'created_at'    => $o->created_at,
                'updated_at'    => $o->updated_at,
            ];
        });

        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with(['details.product'])->findOrFail($id);

        $total = $order->details->sum(fn ($d) => $d->amount ?? $d->price_buy * $d->qty);
        $statusInt = $this->mergeStatus($order->status, $order->status_step, $order->step_code);

        return response()->json([
            'id'          => $order->id,
            'user_id'     => $order->user_id,
            'name'        => $order->name,
            'email'       => $order->email,
            'phone'       => $order->phone,
            'address'     => $order->address,
            'note'        => $order->note,
            'status'      => $statusInt,              // 👈 hợp nhất
            'status_step' => $order->status_step,     // (optional)
            'step_code'   => (int) $order->step_code, // (optional)
            'total'       => (float) $total,
            'created_at'  => $order->created_at,
            'updated_at'  => $order->updated_at,
            'items'       => $order->details->map(function ($d) {
                $p = $d->product;
                return [
                    'order_detail_id' => $d->id,
                    'product_id'      => $d->product_id,
                    'product_name'    => $p?->name ?? 'Sản phẩm đã xoá',
                    'product_image'   => $p?->thumbnail_url ?? $p?->thumbnail ?? null,
                    'price'           => (float) $d->price_buy,
                    'qty'             => (int) $d->qty,
                    'subtotal'        => (float) ($d->amount ?? $d->price_buy * $d->qty),
                ];
            })->values(),
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $data = $request->validate([
            'status' => 'required|in:0,1,2', // 0=pending,1=completed,2=cancelled
        ]);

        $order = DB::transaction(function () use ($id, $data) {
            $o = Order::lockForUpdate()->findOrFail($id);

            $statusInt = (int) $data['status'];
            [$step, $code] = $this->intToStep($statusInt);

            // Ghi ĐỒNG BỘ 3 cột
            $o->status      = $statusInt;
            $o->status_step = $step;
            $o->step_code   = $code;

            if (Auth::check()) $o->updated_by = Auth::id();
            $o->save();

            return $o->fresh();
        });

        return response()->json([
            'message' => 'Updated',
            'order'   => [
                'id'          => $order->id,
                'status'      => (int) $order->status,
                'status_step' => $order->status_step,
                'step_code'   => (int) $order->step_code,
                'updated'     => $order->updated_at,
            ],
        ]);
    }

    // Lấy đơn hàng của user đang đăng nhập
public function myOrders(Request $request)
{
    $userId = Auth::id();
    if (!$userId) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $orders = Order::where('user_id', $userId)
        ->withCount('details')
        ->withSum('details as total', 'amount')
        ->latest('id')
        ->get();

    return response()->json($orders);
}
public function track(Request $request)
{
    $code = $request->query('code');
    $phone = $request->query('phone');

    if (!$code) {
        return response()->json(['error' => 'Thiếu mã đơn hàng'], 400);
    }

    // Tìm theo id hoặc code
    $q = \App\Models\Order::with(['details.product'])
        ->where('id', $code)
        ->orWhere('code', $code);

    // Nếu có phone thì kiểm tra theo số điện thoại
    if ($phone) {
        $q->where(function ($qq) use ($phone) {
            $qq->where('phone', $phone)
               ->orWhere('shipping_phone', $phone);
        });
    }

    $order = $q->first();

    if (!$order) {
        return response()->json(['error' => 'Không tìm thấy đơn hàng'], 404);
    }

    // Chuẩn hóa response
    return response()->json([
        'id'        => $order->id,
        'code'      => $order->code ?? $order->id,
        'status'    => $order->status,
        'created_at'=> $order->created_at,
        'updated_at'=> $order->updated_at,
        'note'      => $order->note,
        'address'   => $order->address,
        'phone'     => $order->phone,
        'shipping_name'  => $order->name,
        'shipping_phone' => $order->phone,
        'shipping_address' => $order->address,
        'items' => $order->details->map(function ($d) {
            return [
                'id'        => $d->id,
                'product_id'=> $d->product_id,
                'name'      => $d->product->name ?? '',
                'price'     => $d->price,
                'qty'       => $d->qty,
                'thumbnail_url' => $d->product->thumbnail_url ?? null,
            ];
        }),
        'total' => $order->total,
        'payment_method' => $order->payment_method,
    ]);
}
// ========== Cancel Order ==========
public function cancel(Request $request, $id)
{
    $order = Order::find($id);
    if (!$order) {
        return response()->json(['error' => 'Không tìm thấy đơn hàng'], 404);
    }

    // chỉ cho phép hủy nếu đang chờ hoặc đã xác nhận
    if (!in_array($order->status, [0, null])) { // 0 = pending
        return response()->json(['error' => 'Đơn không thể hủy'], 400);
    }

    $reason = $request->input('reason');

    DB::transaction(function () use ($order, $reason) {
        $order->status      = 2; // 2 = cancelled
        $order->status_step = 'canceled';
        $order->step_code   = 0;
        $order->note        = trim(($order->note ?? '') . "\nHủy: " . $reason);
        if (Auth::check()) $order->updated_by = Auth::id();
        $order->save();
    });

    return response()->json([
        'message' => 'Đã hủy đơn hàng',
        'order'   => [
            'id'          => $order->id,
            'status'      => (int) $order->status,
            'status_step' => $order->status_step,
            'step_code'   => (int) $order->step_code,
            'updated_at'  => $order->updated_at,
        ],
    ]);
}

// Hủy theo code (dành cho khách nhập mã đơn)
public function cancelByCode(Request $request)
{
    $code = $request->input('code');
    if (!$code) {
        return response()->json(['error' => 'Thiếu mã đơn hàng'], 400);
    }

    $order = Order::where('id', $code)
        ->orWhere('code', $code)
        ->first();

    if (!$order) {
        return response()->json(['error' => 'Không tìm thấy đơn hàng'], 404);
    }

    if (!in_array($order->status, [0, null])) {
        return response()->json(['error' => 'Đơn không thể hủy'], 400);
    }

    $reason = $request->input('reason');

    DB::transaction(function () use ($order, $reason) {
        $order->status      = 2;
        $order->status_step = 'canceled';
        $order->step_code   = 0;
        $order->note        = trim(($order->note ?? '') . "\nHủy: " . $reason);
        if (Auth::check()) $order->updated_by = Auth::id();
        $order->save();
    });

    return response()->json([
        'message' => 'Đã hủy đơn hàng',
        'order'   => [
            'id'          => $order->id,
            'status'      => (int) $order->status,
            'status_step' => $order->status_step,
            'step_code'   => (int) $order->step_code,
            'updated_at'  => $order->updated_at,
        ],
    ]);
}

}
