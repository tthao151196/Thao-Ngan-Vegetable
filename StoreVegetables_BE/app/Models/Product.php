<?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Model;

// class Product extends Model
// {
//     protected $table = 'nqtv_product';
//     protected $primaryKey = 'id';
//     public $timestamps = true;

//     protected $fillable = [
//         'category_id',
//         'brand_id',
//         'name',
//         'slug',
//         'price_root',
//         'price_sale',
//         'thumbnail',
//         'qty',
//         'detail',
//         'description',
//         'status',
//     ];

//     protected $casts = [
//         'price_root' => 'float',
//         'price_sale' => 'float',
//     ];

//     // ✅ Không ẩn thumbnail nữa, để append thêm url
//     protected $appends = ['thumbnail_url'];

//     public function getThumbnailUrlAttribute()
//     {
//         if (!$this->thumbnail) {
//             return asset('assets/images/no-image.png');
//         }

//         $path = ltrim($this->thumbnail, '/');

//         if (str_starts_with($path, 'http')) {
//             return $path;
//         }

//         if (str_starts_with($path, 'assets/')) {
//             return asset($path);
//         }

//         return asset('assets/images/' . $path);
//     }
// }



namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'uttt_product';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'category_id','name','slug','price_root','price_sale',
        'thumbnail','qty','detail','description','status',
    ];

    protected $casts = [
        'price_root' => 'float',
        'price_sale' => 'float',
    ];

    // ✅ Thuộc tính ảo để FE dùng trực tiếp
    protected $appends = ['thumbnail_url','brand_name'];

  
    public function getBrandNameAttribute()
    {
        return optional($this->brand)->name; // "Nike", "Levis", ...
    }

  public function getThumbnailUrlAttribute()
{
    if (!$this->thumbnail) {
        return asset('assets/images/no-image.png'); // ảnh mặc định
    }

    $path = ltrim($this->thumbnail, '/');

    // 1) Nếu đã là full URL
    if (preg_match('~^https?://~i', $path)) {
        return $path;
    }

    // 2) Nếu tồn tại trong storage/app/public (ảnh upload mới)
    if (\Illuminate\Support\Facades\Storage::disk('public')->exists($path)) {
        return asset('storage/' . $path);
    }

    // 3) Nếu đường dẫn bắt đầu bằng assets/... (ảnh cũ nằm trong /public/assets/images)
    if (str_starts_with($path, 'assets/')) {
        return asset($path);
    }

    // 4) Nếu tồn tại trong thư mục public/images hoặc assets/images
    if (file_exists(public_path($path))) {
        return asset($path);
    }

    if (file_exists(public_path('assets/images/' . $path))) {
        return asset('assets/images/' . $path);
    }

    // 5) fallback cuối cùng
    return asset('assets/images/no-image.png');
}

public function reviews()
{
    return $this->hasMany(Review::class, 'product_id');
}


}
