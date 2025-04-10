<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\TokenAuthController;
use App\Http\Controllers\Api\RefugiController;


Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [TokenAuthController::class, 'login']);
Route::get('/refugis', [RefugiController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



