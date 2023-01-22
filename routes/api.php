<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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
//Protected route
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();

    });
Route::post('/companies', [CompanyController::class, 'store']);
Route::get('/companies/search/{name}', [ProductController::class, 'search']);
Route::delete('/companies/{id}', [CompanyController::class, 'destroy']); 
Route::put('/companies/{id}',[CompanyController::class, 'update']);
Route::get('/companies', [CompanyController::class, 'index']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::apiResource('/users', UserController::class);

//Route::apiResource('/companies', CompanyController::class);

});
// Public route
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/companies/{id}', [CompanyController::class, 'show']);

//  Auth::routes();
// /*   Admin Routes List */
// Route::middleware('auth', 'user-access:admin')->group(function() {
//     Route::get('/dashboard', [AuthController::class]);
       

//     });
// /*   Admin Routes List */
// Route::middleware('auth', 'user-access:manager')->group(function() {
//     Route::get('/manager/home', [HomeController::class, 'managerHome'])->name('manager.home');
       

//     });
// /*   Admin Routes List */
// Route::middleware('auth', 'user-access:manager')->group(function() {
//     Route::get('/storemanager/home', [HomeController::class, 'storeManagerHome'])->name('storemanager.home');
       

//     });


