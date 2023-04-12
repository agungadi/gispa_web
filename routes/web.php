<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GeografisController;
use App\Http\Controllers\LayerController;
use App\Http\Controllers\IsiGeografisController;
use App\Http\Controllers\PetaController;
use App\Http\Controllers\PatokController;
use App\Http\Controllers\ClusterController;

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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();


Route::group(['middleware' => ['auth', 'role:Admin|KepalaUPT']], function () {


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

Route::get('data_geografis/{enc}', [IsiGeografisController::class, 'index'])->name('datageografis.index');
Route::get('data_geografis/{id}/edit', [IsiGeografisController::class, 'edit'])->name('datageografis.edit');
Route::put('data_geografis/{id}', [IsiGeografisController::class, 'update'])->name('datageografis.update');
Route::post('data_geografis', [IsiGeografisController::class, 'store'])->name('datageografis.store');
Route::delete('data_geografis/{id}', [IsiGeografisController::class, 'destroy'])->name('datageografis.destroy');
Route::get('data_geografis/editdata/{id}', [IsiGeografisController::class, 'editdata'])->name('datageografis.editdata');
Route::post('data_geografis_hapus/{id}', [IsiGeografisController::class, 'hapus'])->name('datageografis.hapus');



Route::get('patok', [PatokController::class, 'index'])->name('patok.index');
Route::get('patok/{id}/edit', [PatokController::class, 'edit'])->name('patok.edit');
Route::put('patok/{id}', [PatokController::class, 'update'])->name('patok.update');
Route::post('patok', [PatokController::class, 'store'])->name('patok.store');
Route::delete('patok/{id}', [PatokController::class, 'destroy'])->name('patok.destroy');

Route::get('result/datageo', [IsiGeografisController::class, 'hasil'])->name('edit.datageo');

Route::get('/petabeta', [App\Http\Controllers\HomeController::class, 'leaflet'])->name('leaflet');

Route::get('/peta', [PetaController::class, 'index'])->name('geografis.peta');

Route::post('/get_layer', [PetaController::class, 'get_layer'])->name('geografis.getlayer');
Route::post('/get_patok', [PetaController::class, 'get_patok'])->name('geografis.getpatok');


// Route::get('cluster', [ClusterController::class, 'index'])->name('cluster.index');
// Route::get('cluster', [ClusterController::class, 'index'])->name('cluster.index');


Route::get('/clustering', [ClusterController::class, 'homeCluster'])->name('cluster.iterasi');
Route::post('/clustering/get', [ClusterController::class, 'getDetail'])->name('cluster.get');

Route::get('/clustering/{enc}', [ClusterController::class, 'detailCluster'])->name('cluster.detail');

Route::get('cluster', [ClusterController::class, 'index'])->name('cluster.index');

Route::get('clusterpeta', [ClusterController::class, 'PetaCluster'])->name('cluster.peta');


// Route::get('/cluster', [ClusterController::class, 'index'])->name('cluster.index');



});
