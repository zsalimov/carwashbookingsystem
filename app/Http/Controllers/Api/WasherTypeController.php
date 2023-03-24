<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class WasherTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('defWasherType')
            ->select('*')->get();
    }
    
    public function get_washers($id)
    {      
        // SELECT wtId, wtDescription FRom refwasherwashertype 
        // join defwashertype on wwtWasherTypeId = wtId
        // where wwtWasherId = 1
  
        $washers = DB::table('defWasherType')
        ->join('refWasherWasherType','wtId', '=' ,'wwtWasherTypeId')        
        ->where('wwtWasherId','=',$id)      
        ->select('wtId','wtDescription')
        ->get();

        return $washers;
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

        DB::table('refWasherWasherType')
            ->where('wwtWasherId', $data['wId'])
            ->where('wwtWasherTypeId', $data['wtId'])
            ->limit(1)
            ->delete();

            return 1;
    }
    public function get_unused_washer_type($id)
    {
    // SELECT * FROM defvehicletype
    // WHERE vtId NOT IN 
    // (SELECT vtId FROM `refwashervehicletype` 
    // JOIN defvehicletype
    // on wvVehicleTypeId = vtId
    // WHERE wvWasherId = 2)
            
             

        $washer = DB::select("SELECT * FROM defwashertype 
        WHERE wtId NOT IN 
        (SELECT wtId FROM refwasherwashertype 
        JOIN defwashertype
        on wwtWasherTypeId = wtId
        WHERE wwtWasherId = $id)");

        return $washer;
    }

    public function add_washers(Request $request)
    {
        $data = $request->all();      

        DB::table('refWasherWasherType')
            ->insert($data);

            return 1;
    }

}
?>