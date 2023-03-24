<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MyVehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {

        return DB::table('defvehicle')
            ->join('defVehicleType', 'defvehicle.vVehicleTypeId', '=', 'defVehicleType.vtId' )
            ->where('defvehicle.vUserId', '=', $id )
            ->select('defvehicle.vId', 'defvehicle.vPlateNumber', 'defVehicleType.vtName')
            ->get();
    }

    public function get_vehicle($id)
    {
        return DB::table('defvehicle')            
            ->where('defvehicle.vId', '=', $id )
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $data = $request->all();
        $data['vUserId'] = $user["id"]; 
        $name = $request->input('vPlateNumber');
        
        DB::table('defVehicle')->insert($data);
        
        return response([
            'code' => 1,
            'description' => $name . ' successfully inserted into DB with id number: ' . DB::getPdo()->lastInsertId()
        ]);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {       
        $vehicle = DB::table('defVehicle')
            ->where('vId', '=', $id)
            ->limit(1)
            ->update($request->all()); 
        
        return $vehicle;        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return DB::table('defVehicle')
            ->where('vId', $id)
            ->delete();
    }
    public function my_vehicle_types() {
        return DB::table('defVehicleType')->get();
    }
}
