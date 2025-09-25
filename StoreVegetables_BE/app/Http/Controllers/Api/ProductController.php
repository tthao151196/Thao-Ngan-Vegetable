<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    // ====== Cho khách ======

    // Danh sách sản phẩm (có phân trang)
    public function index()
    {
        return Product::select(['id','name','price_sale as price','thumbnail'])
            ->latest('id')
            ->paginate(12);
    }

    // Chi tiết sản phẩm
    public function show($id)
    {
        $product = Product::select([
                'id',
                'name',
                'price_sale as price',
                'thumbnail',
                'detail',
                'description',
                'category_id',
            ])
            ->find($id);

        if (!$product) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return $product;
    }

    // Sản phẩm theo danh mục
    public function byCategory($id)
    {
        return Product::where('category_id', $id)
            ->select(['id','name','price_sale as price','thumbnail'])
            ->latest('id')
            ->paginate(12);
    }

    // ====== Cho admin ======

    // Danh sách sản phẩm (có phân trang)
    public function adminIndex()
    {
        return Product::select([
                'id',
                'name',
                'slug',
                'price_root',
                'price_sale',
                'qty',
                'thumbnail'
            ])
            ->latest('id')
            ->paginate(10);
    }

    // Thêm sản phẩm
    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'slug'       => [
                'required',
                'string',
                'max:255',
                Rule::unique((new Product)->getTable(), 'slug'),
            ],
            'price_root' => 'required|numeric|min:0',
            'price_sale' => 'nullable|numeric|min:0',
            'qty'        => 'required|integer|min:0',
            'thumbnail'  => 'nullable|image|max:2048',
        ]);

        $data = $request->only([
            'name','slug','price_root','price_sale','qty','category_id','detail','description'
        ]);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('products', 'public');
        }

        $product = Product::create($data);

        return response()->json($product, 201);
    }

    // Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name'       => 'required|string|max:255',
            'slug'       => [
                'required',
                'string',
                'max:255',
                Rule::unique((new Product)->getTable(), 'slug')->ignore($id),
            ],
            'price_root' => 'required|numeric|min:0',
            'price_sale' => 'nullable|numeric|min:0',
            'qty'        => 'required|integer|min:0',
            'thumbnail'  => 'nullable|image|max:2048',
        ]);

        $data = $request->only([
            'name','slug','price_root','price_sale','qty','category_id','detail','description'
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($product->thumbnail && Storage::disk('public')->exists($product->thumbnail)) {
                Storage::disk('public')->delete($product->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('products', 'public');
        }

        $product->update($data);

        return response()->json($product);
    }

    // Xoá sản phẩm
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->thumbnail && Storage::disk('public')->exists($product->thumbnail)) {
            Storage::disk('public')->delete($product->thumbnail);
        }

        $product->delete();

        return response()->json(['message' => 'Đã xoá sản phẩm']);
    }
}
