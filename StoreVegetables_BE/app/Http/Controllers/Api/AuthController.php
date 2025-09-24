<?php

// app/Http/Controllers/Api/AuthController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'                  => ['required','string','max:100'],
            'email'                 => ['required','email','max:255', Rule::unique('uttt_user','email')],
            'password'              => ['required','string','min:6','confirmed'],
            'phone'                 => ['required','string','max:20'],
            // optional
            'address'               => ['nullable','string','max:1000'],
            'avatar'                => ['nullable','string','max:255'],
        ]);

        // ---- tạo username duy nhất (bảng có cột username NOT NULL & UNIQUE) ----
        $base = $this->makeBaseUsername($data['name'], $data['email']);
        $username = $this->uniqueUsername($base);

        $user = User::create([
            'name'       => $data['name'],
            'email'      => $data['email'],
            'password'   => $data['password'],    // cast 'hashed' sẽ tự mã hoá
            'phone'      => $data['phone'],

            'username'   => $username,
            'address'    => $data['address'] ?? '',
            'avatar'     => $data['avatar'] ?? '',

            // DB của bạn có default 'customer', nhưng ta set rõ ràng:
            'roles'      => 'customer',

            // các cột NOT NULL khác:
            'created_by' => 0,
            // 'updated_by' có thể NULL -> không set cũng được
            'status'     => 1, // đang hoạt động
        ]);

        return response()->json([
            'message' => 'Đăng ký thành công',
            'user'    => [
                'id'       => $user->id,
                'name'     => $user->name,
                'email'    => $user->email,
                'phone'    => $user->phone,
                'username' => $user->username,
                'roles'    => $user->roles,
                'status'   => $user->status,
            ],
        ], 201);
    }

    private function makeBaseUsername(string $name, string $email): string
    {
        $base = Str::slug($name, '');
        if ($base === '') $base = Str::before($email, '@');
        return strtolower($base);
    }

    private function uniqueUsername(string $base): string
    {
        $username = $base;
        $i = 0;
        while (User::where('username', $username)->exists()) {
            $i++;
            $username = $base.$i; // name, name1, name2...
        }
        return $username;
    }
    
}
