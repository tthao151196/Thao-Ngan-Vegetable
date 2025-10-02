<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'uttt_category'; // ✅ đúng tên bảng trong DB

    protected $fillable = [
        'name',
        'slug',
        'image',
        'parent_id',
        'sort_order',
        'description',
        'created_by',
        'updated_by',
        'status',
    ];
}
