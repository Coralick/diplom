<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Tables\TableController;
use App\Http\Controllers\Tables\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/home', [TableController::class, 'get'])->name('home');
    Route::post('/home', [TableController::class, 'create'])->name('home.create');
    Route::patch('/home', [TableController::class, 'update'])->name('home.update');
    Route::delete('/home', [TableController::class, 'delete'])->name('home.delete');
    Route::post('/home-get', [TableController::class, 'getForm'])->name('home.data');

    Route::get('/home/table', [TaskController::class, 'get'])->name('home.getTask');
    Route::get('/home/tableNotion', [TaskController::class, 'notion'])->name('task.getTaskNotion');
    Route::post('/home/table', [TaskController::class, 'create'])->name('task.create');
    Route::patch('/home/table', [TaskController::class, 'update'])->name('task.update');
    Route::delete('/home/table', [TaskController::class, 'delete'])->name('task.delete');

    Route::get('/home/table/task', [TaskController::class, 'getOne'])->name('task.getTask');
    Route::post('/add-user', [TaskController::class, 'addUser'])->name('task.add-user');
    Route::post('/remove-user', [TaskController::class, 'removeUser'])->name('task.remove-user');

});