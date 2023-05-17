<?php

namespace App\Http\Controllers\Api;

use DateTime;

use App\Models\TimeHelper;
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
        $user = Auth::user();
        $store_id = DB::table('refUserStore')
            ->where('usUserId', $user["id"])->value('usStoreId');
        if ($store_id < 1) return null;

        $washers = DB::table('defWasher')
            ->leftjoin('defOpenClosePattern', 'defOpenClosePattern.ocpId', '=', 'defWasher.wOpenClosePatternId')
            ->leftjoin('defStore', 'defStore.sId', '=', 'defWasher.wStoreId')
            ->where('wStoreId', '=', $store_id)
            ->select('defWasher.wId', 'defStore.sName', 'defWasher.wName', 'defOpenClosePattern.ocpName')
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
        $washer = DB::table('defWasher')
            ->where('wId', '=', $id)
            ->limit(1)
            ->update($request->all());

        return $washer;
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

    // My Vehicle controller function to find the nearest washer for the client using the formula d= sqrt of x^2 - y^2

    public function get_nearest_washers(Request $request)
    {
        $data = $request->all();

        $vId = $data['vId'];
        $vtId = DB::table('Defvehicle')
            ->where('vId', '=', $vId)
            ->value('vVehicleTypeId');               
        $washers = DB::table('defStore')
            ->join('defWasher', 'wStoreId', 'sId')
            ->join('refWasherVehicleType', 'wId', 'wvWasherId')
            ->where('wvVehicleTypeId', '=', $vtId)
            ->get();

        $arr = array();
        $map = array();
        $dist = array();
        $distance = array();
        $i = 0;

        foreach ($washers as $washer) {
            $x1 = $data['lat'];
            $x2 = $washer->sLatitude;
            $y1 = $data['lng'];
            $y2 = $washer->sLongitude;
            $x = $x2 - $x1;
            $y = $y2 - $y1;

            $c = pi() / 180;  // formule for converting degrees to radians and calculating distance
            $dist[$i] = acos(sin($x1 * $c) * sin($x2 * $c) + cos($x1 * $c) * cos($x2 * $c) * cos($y2 * $c - $y1 * $c)) * 6371;

            //echo ($washer->sLongitude);echo(' x'); echo($data['lng']); echo(' y');echo($y);

            $distance[$i] = sqrt(($x * $x) + ($y * $y));
            $arr[$washer->wId] = $distance[$i];
            $map[$washer->wId] = $washer;
            $washer->distance = round($dist[$i] / 1.61, 2);

            // echo($dist[$i]); echo($i+1);
            $i++;
        }

        asort($arr); //  key = washerid, value = distance, asc sorted        
        // to able to return the 5 results with key value pairs we pass all the keys in the result[]

        $result = array();
        $count = 5;

        foreach ($arr as $k => $v) {
            $washer = $map[$k];
            if ($washer->distance > $data['distance'])
                break;

            $result[] = $washer;

            $count--;
            if ($count == 0)
                break;
        }

        return $result;
    }

    public function get_washer_vehicle(Request $request)
    {
        $data = $request->all(); // wId, vId was recieved 
        $vId = $data['vId'];
        $wId = $data['wId'];
        $day = $data['day'];
        $m_day = $data['date'];
        $month = $data['month'];
        $year = $data['year'];
        // convering to start the week from monday from index 1
        if ($day == 0) {
            $day = 7;
        }
        $vtId = DB::table('defVehicle')
            ->where('vId', '=', $vId)
            ->value('vVehicleTypeId');

        $patterns = DB::table('defWasher')
            ->join('defOpenClosePattern', 'ocpId', 'wOpenClosePatternId')
            ->join('defopenclosedurations', 'ocdId', 'ocpDay' . $day)
            ->where('wId', '=', $wId)
            ->get();

        $washers = DB::table('refWasherWasherTypeVehicleType')
            ->where('wwtvtWasherId', '=', $wId)
            ->where('wwtvtVehicleTypeId', '=', $vtId)
            ->where('wwtvtWasherTypeId', '=', $data['wtId'])
            ->get();

        if (count($washers) > 0 && count($patterns) > 0) {
            $st = $patterns[0]->ocdStartTime;
            $et = $patterns[0]->ocdEndTime;
            $price = $washers[0]->wwtvtPrice;
            $interval = $washers[0]->wwtvtDurationMin;

            $sta = explode(':', $st);
            $eta = explode(':', $et);

            $patterns[0]->ocdStartTime = intval($sta[0]);
            $patterns[0]->ocdEndTime = intval($eta[0]);

            $washers[0]->pattern = $patterns[0];
            $washers[0]->day = $day;

            $date = new DateTime();
            $date->setDate($year, $month, $m_day); // year month day
            $date->setTime('0', '0', '0');

            $times = $this->getTimes($date, $patterns[0]->ocdStartTime, $patterns[0]->ocdEndTime, $interval, $price, $wId);
            $washers[0]->times = $times;
            $nextdate = clone $date;
            $nextdate->modify('+1 day');
            $washers[0]->pRes = $this->getReservations($date, $nextdate, $wId);
        }           
        return $washers;
    }

    function getReservations($date, $nextdate, $wId)
    {
        $reservations = DB::table('defReservation')
            ->where('rStartTime', '>=', $date)
            ->where('rEndTime', '<=', $nextdate)
            ->where('rCancelled', '=', 0)
            ->where('rWasherId', '=', $wId)
            ->get();

        foreach ($reservations as $r) {
            $r->rStartTime = new DateTime($r->rStartTime);
            $r->rEndTime = new DateTime($r->rEndTime);
        }

        return $reservations;
    }

    function getPromotionRates($wId, $date)
    {
        $promotions = DB::table('refWasherPromotion')
            ->where('wpWasherId', '=', $wId)
            ->get();

        foreach ($promotions as $p) {
            $sDate = clone $date;
            $eDate = clone $date;
            $sDate->modify('+' . $p->wpStartMin . ' minutes');
            $eDate->modify('+' . $p->wpEndMin . ' minutes');
            $p->wpStartTime = $sDate;
            $p->wpEndTime = $eDate;
        }

        return $promotions;
    }

    function getTimes($date, $sh, $eh, $im, $price, $wId)
    {
        $nextdate = clone $date;
        $nextdate->modify('+1 day');
        $reservations = $this->getReservations($date, $nextdate, $wId);
        $promotions = $this->getPromotionRates($wId, $date);

        $date->modify('+' . $sh . ' hours');
        $now = new DateTime();
        $di = clone $date;

        $hourArray = array();
        $result = array();

        $day = $date->format('d');
        $curHour = $di->format('H');
        while ($di->format('d') == $day) {
            $status = 0;
            $slot_price = $price;
            $promotion = 0;
            foreach ($promotions as $p) {
                if ($di > $p->wpStartTime && $di < $p->wpEndTime) {
                    $promotion = $p->wpPromotionRate;
                    $slot_price = $price-( $promotion * $price / 100.0);
                }
            }
            $diEnd = clone $di;
            $diEnd->modify('+' .  $im . ' minutes');
            if ($di < $now) {
                $status = 2;
            } else {
                foreach ($reservations as $r) {   // di: 12:45 diEnd: 12:50, rSatrat: 12:40 rEnd: 12:45
                    if ($r->rStartTime <= $di && $r->rEndTime > $di) {
                        $status = 1;
                        break;
                    }
                    if ($r->rStartTime >= $di && $r->rStartTime < $diEnd) {
                        $status = 1;
                        break;
                    }
                }
            }

            $obj = new TimeHelper($di->format('Y-m-d H:i:s'), $di->format('H:i'), $status, $slot_price, $promotion);

            if ($curHour != $di->format('H')) {
                $result[] = $hourArray;
                $curHour = $di->format('H');
                $hourArray = array();
                if ($curHour > $eh) break;
            }

            $hourArray[] = $obj;
            $di->modify('+' .  $im . ' minutes');
        }

        if (count($hourArray) > 0)
            $result[] = $hourArray;

        return $result;
    }


    public function get_washer_washer_type(Request $request)
    {
        $data = $request->all(); // wId, vId was recieved 

        // SELECT * FROM defWasherType
        // JOIN refWasherWasherType ON wtId = wwtWasherTypeId
        // WHERE wwtWasherId = 8

        $washer_types = DB::table('defWasherType')
            ->join('refWasherWasherType', 'wtId', 'wwtWasherTypeId')
            ->where('wwtWasherId', '=', $data['wId'])
            ->get();

        return $washer_types;
    }
}
?>