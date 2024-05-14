<?php

use App\Http\Controllers\TableController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    return $request->user();
});

Route::post('/authUser', [UserController::class, "authUser"]);

Route::get('/user', [UserController::class, "getUser"]);
Route::post('/user', [UserController::class, "registerUser"]);
Route::put('/user', [UserController::class, "updsteUser"]);
Route::delete('/user', [UserController::class, "deleteUser"]);

Route::get('/table', [TableController::class, "tableShow"]);
Route::post('/table', [TableController::class, "createTable"]);
Route::put('/table', [TableController::class, "updateTable"]);
Route::get('/table_one', [TableController::class, "getOneTable"]);

Route::get('/task', [TableController::class, "taskShow"]);
Route::put('/task', [TableController::class, "updateTask"]);
Route::post('/task', [TableController::class, "taskCreate"]);
Route::get('/task_one', [TableController::class, "getOneTask"]);


