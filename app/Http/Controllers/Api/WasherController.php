<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class WasherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $washers = DB::table('defWasher')
            ->leftjoin('defopenclosepattern','defopenclosepattern.ocpId', '=' ,'defWasher.wOpenClosePatternId')
            ->leftjoin('defstore','defstore.sId', '=' ,'defWasher.wStoreId')
            ->select('defWasher.wId','defStore.sName','defWasher.wName','defopenclosepattern.ocpName')
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
        $user = Auth::user();
        $store_id = DB::table('refUserStore')
            ->where('usUserId', $user["id"])->value('usStoreId');

        $request->validate([
            'wName' => 'required|string|max:55|min:2'
            
        ]);
        
        $data = $request->all();
        
        $data['wStoreId'] = $store_id;
        $name = $request->input('wName');
        
        DB::table('defWasher')->insert($data);
        
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
       
        $store = DB::table('defWasher')
            ->where('wId', '=', $id)
            ->limit(1)
            ->update($request->all());    
        
        return $store;
        
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return DB::table('defWasher')
            ->where('wId', $id)
            ->delete();
    }

    public function get_washer($id)
    {
        return DB::table('defWasher')->where('wId', '=', $id)->first();
    }
}
