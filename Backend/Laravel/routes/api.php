<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AdminController;

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
    });
});
