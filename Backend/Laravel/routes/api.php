<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AdminController;
use App\Http\Controllers\HeroSettingsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PopularProductController;

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

        // Hero settings routes
        Route::get('/hero-settings', [HeroSettingsController::class, 'index']);
        Route::post('/hero-settings', [HeroSettingsController::class, 'update']);
        Route::get('/hero-settings/available-products', [HeroSettingsController::class, 'getAvailableProducts']);

        // Product routes
        Route::apiResource('products', ProductController::class);

        // Popular products routes
        Route::get('/popular-products/available', [PopularProductController::class, 'getAvailableProducts']);
        Route::post('/popular-products/order', [PopularProductController::class, 'updateOrder']);
        Route::apiResource('popular-products', PopularProductController::class);
    });
});

// Public routes
Route::get('/hero-settings', [HeroSettingsController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/popular-products', [PopularProductController::class, 'index']);
