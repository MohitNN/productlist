<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Usercontroller;

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', [Usercontroller::class, 'logout']);
    Route::get('/product', [Usercontroller::class, 'product']);
});
Route::post('/register',[Usercontroller::class, 'register']);
Route::post('/login', [Usercontroller::class, 'login']);
