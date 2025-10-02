<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // ✅ Lấy tất cả danh mục (Customer đang dùng)
    public function index()
    {
        $cats = Category::all()->map(function ($cat) {
            $cat->image_url = $cat->image 
                ? url('assets/images/' . $cat->image) 
                : null;
            return $cat;
        });

        return response()->json($cats);
    }

    // ✅ Lấy chi tiết danh mục theo id (Customer đang dùng)
    public function show($id)
    {
        $cat = Category::find($id);
        if (!$cat) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $cat->image_url = $cat->image 
            ? url('assets/images/' . $cat->image) 
            : null;

        return response()->json($cat);
    }

    // ✅ Thêm mới danh mục (Admin dùng)
   public function store(Request $request)
{
    $data = $request->validate([
        'name'        => 'required|string|max:1000',
        'slug'        => 'required|string|max:1000|unique:uttt_category,slug',
        'image'       => 'nullable|string|max:1000',
        'parent_id'   => 'nullable|integer',
        'sort_order'  => 'nullable|integer',
        'description' => 'nullable|string',
        'status'      => 'nullable|integer',
    ]);

    $data['created_by'] = 1;
    $data['status'] = $data['status'] ?? 1; // ✅ nếu không có thì mặc định là 1

    $cat = Category::create($data);

    $cat->image_url = $cat->image 
        ? url('assets/images/' . $cat->image) 
        : null;

    return response()->json([
        'message'  => 'Thêm danh mục thành công',
        'category' => $cat,
    ], 201);
}
public function destroy($id)
    {
        $cat = Category::find($id);

        if (!$cat) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $cat->delete();

        return response()->json(['message' => 'Xóa danh mục thành công']);
    }


    public function update(Request $request, $id)
{
    $cat = Category::find($id);
    if (!$cat) {
        return response()->json(['message' => 'Category not found'], 404);
    }

    $data = $request->validate([
        'name'        => 'required|string|max:1000',
        'slug'        => 'required|string|max:1000|unique:uttt_category,slug,' . $id,
        'image'       => 'nullable|string|max:1000',
        'parent_id'   => 'nullable|integer',
        'sort_order'  => 'nullable|integer',
        'description' => 'nullable|string',
        'status'      => 'nullable|integer',
    ]);

    $data['updated_by'] = 1; // Hoặc Auth::id()

    $cat->update($data);

    $cat->image_url = $cat->image 
        ? url('assets/images/' . $cat->image) 
        : null;

    return response()->json([
        'message' => 'Cập nhật danh mục thành công',
        'category' => $cat,
    ]);
}

}
