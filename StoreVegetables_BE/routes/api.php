<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ReviewController;

// ===== Auth thường =====
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/logout',   [AuthController::class, 'logout'])->middleware('auth:sanctum');

// ✅ Admin login (KHÔNG để trong group auth)
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

// ===== Products =====
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories/{id}/products', [ProductController::class, 'byCategory']);

// ===== Reviews =====
Route::get('/products/{id}/reviews', [ReviewController::class, 'index']);
Route::get('/products/{id}/can-review', [ReviewController::class, 'canReview'])->middleware('auth:sanctum');
Route::post('/products/{id}/reviews', [ReviewController::class, 'store'])->middleware('auth:sanctum');
Route::put('/reviews/{id}', [ReviewController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy'])->middleware('auth:sanctum');

// ===== Categories =====
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// ===== Orders =====
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::get('/orders/track', [OrderController::class, 'track']);
Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel']);
Route::post('/orders/cancel', [OrderController::class, 'cancelByCode']);
Route::post('/checkout', [OrderController::class, 'checkout'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/my-orders', [OrderController::class, 'myOrders']);
});

// ===== Admin APIs (yêu cầu token) =====
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/products',          [ProductController::class, 'adminIndex']);
    Route::post('/products',         [ProductController::class, 'store']);
    Route::put('/products/{id}',     [ProductController::class, 'update']);
    Route::delete('/products/{id}',  [ProductController::class, 'destroy']);

    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);

    Route::get('/users',           [UserController::class, 'index']);
    Route::get('/users/{id}',      [UserController::class, 'show']);
    Route::post('/users',          [UserController::class, 'store']);
    Route::put('/users/{id}',      [UserController::class, 'update']);
    Route::delete('/users/{id}',   [UserController::class, 'destroy']);
    Route::post('/users/{id}/lock',   [UserController::class, 'lock']);
    Route::post('/users/{id}/unlock', [UserController::class, 'unlock']);
});
