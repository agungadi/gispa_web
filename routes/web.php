<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GeografisController;
use App\Http\Controllers\LayerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');



Route::get('users', [UserController::class, 'index'])->name('users.index');
Route::get('users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
Route::post('users', [UserController::class, 'store'])->name('users.store');
Route::delete('users/{id}', [UserController::class, 'destroy'])->name('users.destroy');



Route::get('layer', [LayerController::class, 'index'])->name('layer.index');
Route::get('layer/{id}/edit', [LayerController::class, 'edit'])->name('layer.edit');
Route::put('layer/{id}', [LayerController::class, 'update'])->name('layer.update');
Route::post('layer', [LayerController::class, 'store'])->name('layer.store');
Route::delete('layer/{id}', [LayerController::class, 'destroy'])->name('layer.destroy');



Route::get('geografis', [GeografisController::class, 'index'])->name('geografis.index');
Route::get('geografis/{id}/edit', [GeografisController::class, 'edit'])->name('geografis.edit');
Route::put('geografis/{id}', [GeografisController::class, 'update'])->name('geografis.update');
Route::post('geografis', [GeografisController::class, 'store'])->name('geografis.store');
Route::delete('geografis/{id}', [GeografisController::class, 'destroy'])->name('geografis.destroy');

Route::get('data_geografis', [GeografisController::class, 'index'])->name('geografis.index');
Route::get('data_geografis/{id}/edit', [GeografisController::class, 'edit'])->name('geografis.edit');
Route::put('data_geografis/{id}', [GeografisController::class, 'update'])->name('geografis.update');
Route::post('data_geografis', [GeografisController::class, 'store'])->name('geografis.store');
Route::delete('data_geografis/{id}', [GeografisController::class, 'destroy'])->name('geografis.destroy');
