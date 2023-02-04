<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\OpenCloseController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VehicleTypeController;
use App\Http\Controllers\Api\WasherController;
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

Route::delete('/companies/{id}', [CompanyController::class, 'destroy']); 
Route::put('/companies/{id}',[CompanyController::class, 'update']);
Route::get('/companies', [CompanyController::class, 'index']);
Route::get('/company_users', [CompanyController::class, 'company_users']);  //storeUser

Route::post('/logout', [AuthController::class, 'logout']);
Route::apiResource('/users', UserController::class);

// Store routes
Route::get('/stores', [StoreController::class, 'index']);
Route::delete('/stores/{id}', [StoreController::class, 'destroy']); //delete store
Route::delete('/dismiss/{id}', [CompanyController::class, 'dismiss']);  //Dismiss
Route::get('/stores/{id}',[StoreController::class, 'get_store']);
Route::get('/users_0',[StoreController::class, 'users_0']);
Route::put('/stores/{id}',[StoreController::class, 'update']);
Route::post('/stores', [StoreController::class, 'store']);

Route::apiResource('/companies', CompanyController::class);

//Washers route
Route::get('/washers', [WasherController::class, 'index']);
Route::get('/washers/{id}',[WasherController::class, 'get_washer']);
Route::delete('/washers/{id}', [WasherController::class, 'destroy']); //delete store
Route::post('/washers', [WasherController::class, 'store']);
Route::put('/washers/{id}',[WasherController::class, 'update']);
// OpenClose
Route::get('/all_durations', [OpenCloseController::class, 'all_durations']);
Route::get('/all_patterns', [OpenCloseController::class, 'all_patterns']);
// Vechicle types
Route::get('/vehicles/{id}', [VehicleTypeController::class, 'get_vehicles']);
Route::post('/vehicles', [VehicleTypeController::class, 'destroy']); 
Route::post('/vehicles/{id}', [VehicleTypeController::class, 'get_unused_vehicles']); 
Route::post('/add_vehicles', [VehicleTypeController::class, 'add_vehicle']);
});
// Public route
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);




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


