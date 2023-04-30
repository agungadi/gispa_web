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

Route::get('/me', [ApiPatokController::class, 'me']);

Route::post('/patok_limit', [ApiPatokController::class, 'patok_limit']);
Route::post('/patok_map', [ApiPatokController::class, 'patok_map']);

Route::post('/patok_history', [ApiPatokController::class, 'patok_history']);

Route::get('/patok_detail/{id}', [ApiPatokController::class, 'patok_detail']);
Route::post('/patok_cari', [ApiPatokController::class, 'patok_cari']);
Route::post('/patok_add', [ApiPatokController::class, 'patok_add']);
Route::post('/patok_edit', [ApiPatokController::class, 'patok_edit']);
Route::post('/patok_delete', [ApiPatokController::class, 'patok_delete']);

Route::get('/patok_test', [ApiPatokController::class, 'patok_test']);

Route::get('/ruas_jalan', [ApiPatokController::class, 'ruas_jalan']);

Route::post('/patok_ceklast', [ApiPatokController::class, 'patok_ceklast']);

Route::post('/patok_last', [ApiPatokController::class, 'patok_last']);

Route::post('/edit_user', [ApiPatokController::class, 'edit_user']);

// Route::post('/haversine', [ApiPatokController::class, 'haversine']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
