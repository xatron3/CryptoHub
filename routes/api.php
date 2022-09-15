<?php

use App\Http\Controllers\Api\AssetsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventsController;
use App\Http\Controllers\Api\PositionsController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => 'jwt.verify'], function () {
    Route::get('user', [AuthController::class, 'getUser']);

    // Should be protected under admin middleware
    Route::post('asset/add', [AssetsController::class, 'store']);
    Route::post('event/add', [EventsController::class, 'store']);
    // END ADMIN
    Route::get('events', [EventsController::class, 'getAll']);
    Route::get('assets', [AssetsController::class, 'getAll']);

    Route::post('position/add', [PositionsController::class, 'store']);
    Route::post('position/close', [PositionsController::class, 'closePosition']);
    Route::get('positions', [PositionsController::class, 'getAll']);
});