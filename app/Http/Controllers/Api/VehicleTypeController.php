<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Defvehicletype;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class VehicleTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Defvehicletype::all();
    }

    public function get_vehicles($id)
    {        
        $vehicles = DB::table('defVehicleType')
        ->leftjoin('refWasherVehicleType','vtId', '=' ,'wvVehicleTypeId') 
        ->where('wvWasherId','=',$id)      
        ->select('vtId','vtName','wvDurationMin')
        ->get();

        return $vehicles;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function destroy(Request $request)
    {
        $data = $request->all();      

        DB::table('refWasherVehicleType')
            ->where('wvWasherId', $data['wId'])
            ->where('wvVehicleTypeId', $data['vtId'])
            ->limit(1)
            ->delete();

            return 1;
    }

    public function get_unused_vehicles($id)
    {
    // SELECT * FROM defvehicletype
    // WHERE vtId NOT IN 
    // (SELECT vtId FROM `refwashervehicletype` 
    // JOIN defvehicletype
    // on wvVehicleTypeId = vtId
    // WHERE wvWasherId = 2)
            
             

        $vehicles = DB::select("SELECT * FROM defvehicletype 
        WHERE vtId NOT IN 
        (SELECT vtId FROM refwashervehicletype 
        JOIN defvehicletype
        on wvVehicleTypeId = vtId
        WHERE wvWasherId = $id)");

        return $vehicles;
    }

    public function add_vehicle(Request $request)
    {
        $data = $request->all();      

        DB::table('refWasherVehicleType')
            ->insert($data);

            return 1;
    }

}
