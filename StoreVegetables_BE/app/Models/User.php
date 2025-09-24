<?php

// app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'uttt_user';
    protected $primaryKey = 'id';
    public $timestamps = true; // bảng có created_at/updated_at

    protected $fillable = [
        'name','email','password','phone',
        'username','address','avatar','roles',
        'created_by','updated_by','status',
    ];

    protected $hidden = ['password','remember_token'];

    protected $casts = [
        'password' => 'hashed',
        'email_verified_at' => 'datetime',
    ];
}
