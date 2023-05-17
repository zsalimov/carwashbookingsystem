<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\ConfigController;
use App\Http\Controllers\Api\MyVehicleController;
use App\Http\Controllers\Api\OpenCloseController;
use App\Http\Controllers\Api\PostProcessController;
use App\Http\Controllers\Api\PromotionController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\ServiceTypeController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VehicleTypeController;
use App\Http\Controllers\Api\WasherController;
use App\Http\Controllers\Api\WasherTypeController;
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
Route::apiResource('users', UserController::class);
Route::post('/statistics', [CompanyController::class, 'statistics']);  // All statistics depending of the user type

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
Route::post('/get_washer_vehicle', [WasherController::class, 'get_washer_vehicle']);
Route::post('/get_washer_washer_type', [WasherController::class, 'get_washer_washer_type']);

Route::put('/washers/{id}',[WasherController::class, 'update']);
// OpenClose
Route::get('/all_durations', [OpenCloseController::class, 'all_durations']);
Route::get('/all_patterns', [OpenCloseController::class, 'all_patterns']);
// Vechicle types
Route::get('/vehicles/{id}', [VehicleTypeController::class, 'get_vehicles']);
Route::post('/vehicles', [VehicleTypeController::class, 'destroy']); 
Route::post('/vehicles/{id}', [VehicleTypeController::class, 'get_unused_vehicles']); 
Route::post('/add_vehicles', [VehicleTypeController::class, 'add_vehicle']);
// Post process
Route::get('/post_processes/{id}', [PostProcessController::class, 'get_post_process']);
Route::post('/post_processes', [PostProcessController::class, 'destroy']); 
Route::post('/post_processes/{id}', [PostProcessController::class, 'get_unused_post_process']); 
Route::post('/add_post_processes', [PostProcessController::class, 'add_post_process']);
// Service Type
Route::get('/service_types/{id}', [ServiceTypeController::class, 'get_service_type']);
Route::post('/service_types', [ServiceTypeController::class, 'destroy']); 
Route::post('/service_types/{id}', [ServiceTypeController::class, 'get_unused_service_type']); 
Route::post('/add_service_types', [ServiceTypeController::class, 'add_service_type']);
// Washer types
Route::get('/washer_type/{id}', [WasherTypeController::class, 'get_washers']);
Route::post('/washer_type/{id}', [WasherTypeController::class, 'get_unused_washer_type']);
Route::post('/washer_type', [WasherTypeController::class, 'destroy']);
Route::post('/add_washers', [WasherTypeController::class, 'add_washers']);

// Washer Type and Vehicle Type Config
Route::get('/config/{id}', [ConfigController::class, 'get_config']);
Route::post('/update_duration', [ConfigController::class, 'update_duration']);
Route::post('/update_price', [ConfigController::class, 'update_price']);
// Promotion Api
Route::get('/promotion/{id}', [PromotionController::class, 'get_promotion']);
Route::post('/add_promotion', [PromotionController::class, 'add_promotion']);
// Customer vehicles
Route::post('/my_vehicles/{id}', [MyVehicleController::class, 'index']);
Route::post('/my_vehicle/{id}', [MyVehicleController::class, 'get_vehicle']);
Route::delete('/my_vehicles/{id}', [MyVehicleController::class, 'destroy']);
Route::post('/my_vehicle_types', [MyVehicleController::class, 'my_vehicle_types']);
Route::post('/my_vehicles', [MyVehicleController::class, 'store']);
Route::put('/my_vehicles/{id}',[MyVehicleController::class, 'update']);
Route::post('/get_nearest_washers', [WasherController::class, 'get_nearest_washers']);
Route::post('/create_reservation', [ReservationController::class, 'create_reservation']);
Route::post('/my_bookings', [ReservationController::class, 'index']);
Route::post('/cancel_booking', [ReservationController::class, 'destroy']);

});

// Public route
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']); 



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

?>
