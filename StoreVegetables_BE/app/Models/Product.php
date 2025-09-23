<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // bảng trong DB
    protected $table = 'uttt_product'; 
    protected $primaryKey = 'id'; 

    // các cột cho phép fill
    protected $fillable = [
        'name', 'brand', 'price', 'category_id', 'description'
    ];
}
