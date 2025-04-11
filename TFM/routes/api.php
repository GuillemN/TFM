<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\TokenAuthController;
use App\Http\Controllers\Api\RefugiController;
use App\Http\Controllers\Api\UserItemStatusController;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [TokenAuthController::class, 'login']);
Route::get('/refugis', [RefugiController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user-item-status/toggle', [UserItemStatusController::class, 'toggle']);
    Route::get('/user-item-status', [UserItemStatusController::class, 'list']);
});
