<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'uttt_order';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'email',
        'address',
        'note',
        'status',
        'updated_by',
        'total',
        'payment_method',
        'created_by',
    ];

    // Quan hệ tới OrderDetail
    public function details()
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }

    // Nếu có user_id trong bảng order
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
