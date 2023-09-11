<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/dashboard', 'UserController@UserDashboard')->middleware(['auth'])->name('dashboard');

Route::post('/save-chat','UserController@saveChat')->middleware(['auth'])->name('save-chat');
Route::post('/get-chat','UserController@getChat')->middleware(['auth'])->name('get-chat');
Route::post('delete-chat','UserController@deleteChat')->middleware(['auth'])->name('delete-chat');

Route::group(['middleware' => ['auth']], function() {
    Route::resource('roles', RoleController::class);
    // Route::resource('users', UserController::class);
    Route::resource('products', ProductController::class);
});

require __DIR__.'/auth.php';
