<?php

use Illuminate\Support\Facades\Route;


// Public Controllers
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;

// Admin Controllers
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\AdminProductController;

/*
|--------------------------------------------------------------------------
| Public API Routes (No Auth)
|--------------------------------------------------------------------------
*/

// Get active products (Frontend)
Route::get('/products', [ProductController::class, 'index']);

// Place order (Guest checkout)
Route::post('/orders', [OrderController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Admin Authentication
|--------------------------------------------------------------------------
*/

// Admin login (Sanctum token)
Route::post('/admin/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Admin Protected Routes (Auth Required)
|--------------------------------------------------------------------------
*/

Route::prefix('admin')
    ->middleware('auth:sanctum')
    ->group(function () {

        // Product Management (Admin)
        Route::get('/products', [AdminProductController::class, 'index']);
        Route::post('/products', [AdminProductController::class, 'store']);
        Route::put('/products/{id}', [AdminProductController::class, 'update']);
        Route::delete('/products/{id}', [AdminProductController::class, 'destroy']);

    });