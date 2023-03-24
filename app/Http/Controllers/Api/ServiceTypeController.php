<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Defvehicletype;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ServiceTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('defServiceType')->get();
    }

    public function get_service_type($id)
    {        
        $st = DB::table('defServiceType')
        ->leftjoin('refWasherServiceType','wstServiceTypeId', '=' ,'stId') 
        ->where('wstWasherId','=',$id)      
        ->select('stId', 'stName','wstPrice')
        ->get();

        return $st;
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

        DB::table('refWasherServiceType')
            ->where('wstWasherId', $data['wId'])
            ->where('wstServiceTypeId', $data['stId'])
            ->limit(1)
            ->delete();

            return 1;
    }

    public function get_unused_service_type($id)
    {
        $st = DB::select("SELECT * FROM defServiceType
        WHERE stId NOT IN 
        (SELECT stId FROM refwasherservicetype 
        JOIN defservicetype
        on wstserviceTypeId = stId
        WHERE wstWasherId = $id)");

        return $st;
    }

    public function add_service_type(Request $request)
    {
        $data = $request->all();      

        DB::table('refWasherServiceType')
            ->insert($data);

            return 1;
    }

}
