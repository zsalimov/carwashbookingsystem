<?php

namespace App\Http\Controllers\Api;


use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $now = new DateTime();
        $reservations = DB::table('defVehicle')
            ->join('defReservation', 'vId', 'rVehicleId')
            ->join('defWasher', 'wId', 'rWasherId')
            ->join('defVehicleType', 'vtId', 'vVehicleTypeId')
            ->where('vUserId', $user["id"])
            ->where('rStartTime', '>', $now)
            //->where('rCancelled', '=', 0)
            ->get();            
        
        return $reservations;
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
        $cancel = array('rCancelled' => 1);

        DB::table('defReservation')
            ->where('rId', '=', $data['rId'])
            ->limit(1)
            ->update($cancel);
        
        return 1;
    }

    public function create_reservation(Request $request)
    {
        $data = $request->all(); 
        $eTime = new DateTime($data['rStartTime']);
        $eTime->modify('+' . $data['rEndTime'] . ' minutes');
        $data['rEndTime'] = $eTime;        
        DB::table('defReservation')->insert($data);
        return 1;
    }
}
?>