<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Defvehicletype;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PostProcessController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('defPostProcess')->get();
    }

    public function get_post_process($id)
    {        
        $pp = DB::table('defPostProcess')
        ->leftjoin('refWasherPostProcess','wppPostProcessId', '=' ,'ppId') 
        ->where('wppWasherId','=',$id)      
        ->select('ppId', 'ppName','wppPrice')
        ->get();

        return $pp;
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

        DB::table('refWasherPostProcess')
            ->where('wppWasherId', $data['wId'])
            ->where('wppPostProcessId', $data['ppId'])
            ->limit(1)
            ->delete();

            return 1;
    }

    public function get_unused_post_process($id)
    {
        $pp = DB::select("SELECT * FROM defPostProcess
        WHERE ppId NOT IN 
        (SELECT ppId FROM refwasherpostprocess 
        JOIN defpostprocess
        on wppPostProcessId = ppId
        WHERE wppWasherId = $id)");

        return $pp;
    }

    public function add_post_process(Request $request)
    {
        $data = $request->all();      

        DB::table('refWasherPostProcess')
            ->insert($data);

            return 1;
    }

}
