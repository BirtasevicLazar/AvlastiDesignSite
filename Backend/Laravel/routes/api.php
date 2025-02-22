<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PopularProductController;
use App\Http\Controllers\OrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Admin auth routes
Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminController::class, 'register']);
    Route::post('/login', [AdminController::class, 'login']);
    
    // Protected admin routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AdminController::class, 'me']);
        Route::post('/logout', [AdminController::class, 'logout']);

        // Product routes
        Route::apiResource('products', ProductController::class);

        // Popular products routes
        Route::get('/popular-products/available', [PopularProductController::class, 'getAvailableProducts']);
        Route::post('/popular-products/order', [PopularProductController::class, 'updateOrder']);
        Route::apiResource('popular-products', PopularProductController::class);

        // Orders routes
        Route::get('/orders', [OrderController::class, 'index']);
        Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    });
});

// Public routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/popular-products', [PopularProductController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
