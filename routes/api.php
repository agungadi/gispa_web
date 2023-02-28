<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiLoginController;
use App\Http\Controllers\Api\ApiPatokController;

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

/* START AUTH */
Route::post('login', [ApiLoginController::class, 'login']);
Route::post('logout', [ApiLoginController::class, 'logout']);


Route::post('/patok_limit', [ApiPatokController::class, 'patok_limit']);
Route::get('/patok_detail/{id}', [ApiPatokController::class, 'patok_detail']);
Route::post('/patok_cari', [ApiPatokController::class, 'patok_cari']);
Route::post('/patok_add', [ApiPatokController::class, 'patok_add']);
Route::get('/ruas_jalan', [ApiPatokController::class, 'ruas_jalan']);

Route::post('/patok_last', [ApiPatokController::class, 'patok_last']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
