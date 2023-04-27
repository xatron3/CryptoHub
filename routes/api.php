<?php

use App\Http\Controllers\Api\AssetsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\EventsController;
use App\Http\Controllers\Api\NotesController;
use App\Http\Controllers\Api\PermissionsController;
use App\Http\Controllers\Api\PositionsController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\MarketData\CoingeckoController;

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

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('events', [EventsController::class, 'get']);
Route::get('assets', [AssetsController::class, 'get']);
Route::get('posts', [BlogPostController::class, 'get']);

Route::group(['middleware' => 'jwt.verify'], function () {
    // User
    Route::get('user', [UserController::class, 'getUser']);
    Route::get('users', [UserController::class, 'allUsers']);
    Route::post('user/update', [UserController::class, 'updateUser']);

    // Notes
    Route::post('notes/add', [NotesController::class, 'store']);
    Route::post('notes/update', [NotesController::class, 'update']);
    Route::post('notes/delete', [NotesController::class, 'destroy']);

    // Positions
    Route::get('positions', [PositionsController::class, 'getAll']);
    Route::post('position/add', [PositionsController::class, 'store']);
    Route::post('position/close', [PositionsController::class, 'closePosition']);
    Route::post('positions/import', [PositionsController::class, 'importPositions']);

    // Should be protected under admin middleware
    Route::post('asset/add', [AssetsController::class, 'store']);
    Route::post('asset/update', [AssetsController::class, 'update']);

    Route::post('event/add', [EventsController::class, 'store']);
    Route::post('event/delete', [EventsController::class, 'destroy']);

    Route::get('roles', [PermissionsController::class, 'getRoles']);
    Route::post('roles/add', [PermissionsController::class, 'storeRole']);
    Route::post('roles/update', [PermissionsController::class, 'updateRole']);

    Route::post('post/add', [BlogPostController::class, 'store']);

    Route::post('commands/price/coingecko', [CoingeckoController::class, 'updateCoingeckoPrices']);
    // END ADMIN
});
