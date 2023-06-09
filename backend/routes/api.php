<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

Route::controller(TodoController::class)->group(function () {
    Route::get('todos', 'index');
    Route::post('todo', 'store');
    Route::get('todo/{id}', 'show');
    Route::put('todo/{id}', 'update');
    Route::delete('todo/{id}', 'destroy');
});


Route::controller(ProfileController::class)->group(function () {
    Route::get('/profiless/{profile}','show');
    Route::post('/profiless', 'store');
    Route::get('/profiles/filter','getByAgeAndLocation');
    Route::get('/profiles/opposite-gender/{gender}','oppositeGenderProfiles');
    Route::post('/profiles/{profile}/favorite', 'favorite');
    Route::post('/profiles/{profile}/block', 'block');
});


Route::controller(UserController::class)->group(function () {
   Route::get('/users/filter', 'getByAgeAndLocation');
   Route::get('/users/search', 'searchByName');
   Route::get('/users/opposite-gender/{gender}','oppositeGenderProfiles');

});


Route::controller(MessageController::class)->group(function () {
Route::post('/messages/{to_user}', 'store');
});
