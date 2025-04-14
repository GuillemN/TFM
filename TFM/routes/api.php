<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\TokenAuthController;
use App\Http\Controllers\Api\RefugiController;
use App\Http\Controllers\Api\UserItemStatusController;
use App\Http\Controllers\Api\RutaController;
use App\Http\Controllers\Api\PicController;


use App\Http\Controllers\Api\MeteoController;


Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [TokenAuthController::class, 'login']);
Route::get('/refugis', [RefugiController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->get('/user/refugis/{status}', [UserItemStatusController::class, 'getRefugisByStatus']);
Route::middleware('auth:sanctum')->get('/refugis/{id}', [RefugiController::class, 'getById']);
Route::get('/meteo', [App\Http\Controllers\Api\MeteoController::class, 'getForecast']);
Route::get('/rutes', [RutaController::class, 'index']);
Route::get('/rutes/{id}', [RutaController::class, 'getById']);
Route::get('/rutes/{id}/mapa', [RutaController::class, 'show']);
Route::get('/rutes/{id}/punts', [RutaController::class, 'getPuntsRuta']);
Route::get('/refugis/{id}/rutes', [RefugiController::class, 'getRutesPerRefugi']);
Route::get('/pics', [PicController::class, 'index']);
Route::get('/pics/{id}/rutes', [PicController::class, 'getRutesPerPic']);
Route::get('/pics/{id}', [App\Http\Controllers\Api\PicController::class, 'getById']);




Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user-item-status/toggle', [UserItemStatusController::class, 'toggle']);
    Route::get('/user-item-status', [UserItemStatusController::class, 'list']);
});
