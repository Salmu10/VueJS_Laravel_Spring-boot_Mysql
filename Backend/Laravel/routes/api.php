<?php

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TableController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReserveController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['admin']], function () {
    Route::resource('table', TableController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('user', AuthController::class);
    Route::resource('reserve', ReserveController::class);
    Route::get('pending', [ReserveController::class, 'pending']);
    Route::get('pending_list', [ReserveController::class, 'pending_list']);
});

// Route::resource('table', TableController::class);
// Route::resource('category', CategoryController::class);
// Route::resource('user', AuthController::class);
// Route::resource('reserve', ReserveController::class);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);