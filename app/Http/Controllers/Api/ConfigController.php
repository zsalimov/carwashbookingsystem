<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class ConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    private function assure_config($id) {
        // 1. In this part washerType selected  [A,B]
        $washer_types = DB::table('refWasherWasherType')
                ->where('wwtWasherId', '=', $id)
                ->select('wwtWasherTypeId')->get(); 
        // 2. Here  vehicleType are selected  [X,Y]
        $vehicle_types = DB::table('refWasherVehicleType')
                ->where('wvWasherId', '=', $id)
                ->select('wvVehicleTypeId')->get();
                
        // 3. In this part washerType x vehicleType times config will be added [AX,AY] 
        $configs = DB::table('refWasherWasherTypeVehicleType')
                ->where('wwtvtWasherId', '=', $id)
                ->select('wwtvtWasherTypeId', 'wwtvtVehicleTypeId')->get();
                  
        // 4. The field that is needs to be deleted are deleted automatically however [AY] should stay
        $existing_keys = array();
        foreach($configs as $c) {
            $wId = $c->wwtvtWasherTypeId;
            $vId = $c->wwtvtVehicleTypeId;
            $key = $wId . '_' . $vId;
            $existing_keys[$key] = 0;

            $found = false;
            foreach($washer_types as $w) {
                foreach($vehicle_types as $v) {
                    if ($wId == $w->wwtWasherTypeId && $vId == $v->wvVehicleTypeId) {
                        $found = true;
                    }
                }
            }
            if (!$found) {
                DB::table('refWasherWasherTypeVehicleType')
                    ->where('wwtvtWasherId','=', $id)
                    ->where('wwtvtWasherTypeId','=', $wId)
                    ->where('wwtvtVehicleTypeId','=', $vId)
                    ->limit(1)
                    ->delete();
            }
        }
        // 5. In this stage missing part of [AY,BX,BY] needs to be added.
        foreach($washer_types as $w) {
            foreach($vehicle_types as $v) { // if ($w and $v are missing they need to be added)
               $key = $w->wwtWasherTypeId . '_' . $v->wvVehicleTypeId;

               if (!array_key_exists($key, $existing_keys)) {
                $data = array(
                    'wwtvtWasherId' => $id,
                    'wwtvtWasherTypeId' => $w->wwtWasherTypeId,
                    'wwtvtVehicleTypeId' => $v->wvVehicleTypeId,
                    'wwtvtDurationMin' => 5,
                    'wwtvtPrice' => 4.99
                );

                DB::table('refWasherWasherTypeVehicleType')
                    ->insert($data);
               }
            }
        }
    }

    public function get_config($id)
    {      
        $this->assure_config($id);
        // SELECT wtId, wtDescription FRom refwasherwashertype 
        // join defwashertype on wwtWasherTypeId = wtId
        // where wwtWasherId = 1
  
        $configs = DB::table('refWasherWasherTypeVehicleType')
        ->join('defWasher','wId', '=' ,'wwtvtWasherId')        
        ->join('defWasherType','wtId', '=' ,'wwtvtWasherTypeId')        
        ->join('defVehicleType','vtId', '=' ,'wwtvtVehicleTypeId')        
        ->where('wwtvtWasherId','=',$id)      
        ->select('wId', 'wName', 'wtId', 'wtDescription', 'vtId', 'vtName', 'wwtvtDurationMin', 'wwtvtPrice')
        ->get();

        return $configs;
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
    public function destroy($id)
    {
        //
    }
    
    public function update_duration(Request $request) {
        $data = $request->all();
        DB::table('refWasherWasherTypeVehicleType')
            ->where('wwtvtWasherId', '=', $data['wId'])
            ->where('wwtvtWasherTypeId', '=', $data['wtId'])
            ->where('wwtvtVehicleTypeId', '=', $data['vtId'])
            ->limit(1)
            ->update(array('wwtvtDurationMin' => $data['durationMin']));
    }

    public function update_price(Request $request) {
        $data = $request->all();
        DB::table('refWasherWasherTypeVehicleType')
            ->where('wwtvtWasherId', '=', $data['wId'])
            ->where('wwtvtWasherTypeId', '=', $data['wtId'])
            ->where('wwtvtVehicleTypeId', '=', $data['vtId'])
            ->limit(1)
            ->update(array('wwtvtPrice' => $data['price']));
    }
}
