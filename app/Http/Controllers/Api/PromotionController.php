<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PromotionController extends Controller
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

    public function get_promotion($id)
    {        
        $configs = $this->get_promotion_min($id);

        foreach($configs as $c) {
            $c->wpStartMin = $this->to_hour($c->wpStartMin);
            $c->wpEndMin = $this->to_hour($c->wpEndMin);
        }

        return $configs;
    }

    public function get_promotion_min($id)
    {        
        $configs = DB::table('refWasherPromotion')
            ->where('wpWasherId', '=', $id)      
            ->select('wpStartMin', 'wpEndMin', 'wpPromotionRate')
            ->orderBy('wpStartMin')
            ->get();
        
        return $configs;
    }

    private function to_hour($min) {
        $hour = (int)($min / 60);
        $m = ((int)$min) % 60;

        $hStr = $hour > 9 ? $hour : '0' . $hour;
        $mStr = $m > 9 ? $m : '0' . $m;

        return $hStr . ':' . $mStr;
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
    
    private function prevent_intersection($data) {
        $promotions = $this->get_promotion_min($data['wpWasherId']);
            
        foreach($promotions as $p) {
            // Any existing promotion will be deleted if it is entirely within the new promotion.
            if ($p->wpStartMin >= $data['wpStartMin'] && $p->wpEndMin <= $data['wpEndMin']) {
                DB::table('refWasherPromotion')
                    ->where('wpWasherId', '=', $data['wpWasherId'])
                    ->where('wpStartMin', '=', $p->wpStartMin)
                    ->where('wpEndMin', '=', $p->wpEndMin)
                    ->limit(1)
                    ->delete();
            }
            else if ($p->wpStartMin < $data['wpStartMin'] && $p->wpEndMin > $data['wpEndMin']) {
            // Any existing promotion is split into 2 promotions if it started before the new promotion and ended after it.
                DB::table('refWasherPromotion')
                    ->where('wpWasherId', '=', $data['wpWasherId'])
                    ->where('wpStartMin', '=', $p->wpStartMin)
                    ->where('wpEndMin', '=', $p->wpEndMin)
                    ->limit(1)
                    ->update(array('wpEndMin' => $data['wpStartMin']));

                $data2 = array(
                    'wpWasherId' => $data['wpWasherId'],
                    'wpStartMin' => $data['wpEndMin'],
                    'wpEndMin' => $p->wpEndMin,
                    'wpPromotionRate' => $p->wpPromotionRate
                );

                DB::table('refWasherPromotion')
                    ->insert($data2);
            }
            // If any existing promotion started before the new promotion and ended in it, the end time is updated.
            else if ($p->wpStartMin < $data['wpStartMin'] && 
                    $p->wpEndMin > $data['wpStartMin']) {
                DB::table('refWasherPromotion')
                    ->where('wpWasherId', '=', $data['wpWasherId'])
                    ->where('wpStartMin', '=', $p->wpStartMin)
                    ->where('wpEndMin', '=', $p->wpEndMin)
                    ->limit(1)
                    ->update(array('wpEndMin' => $data['wpStartMin']));
            }
            // The start time is updated if any existing promotion started inside the new promotion and ended outside it.
            else if ($p->wpStartMin < $data['wpEndMin'] && 
                    $p->wpEndMin > $data['wpEndMin']) {
                DB::table('refWasherPromotion')
                    ->where('wpWasherId', '=', $data['wpWasherId'])
                    ->where('wpStartMin', '=', $p->wpStartMin)
                    ->where('wpEndMin', '=', $p->wpEndMin)
                    ->limit(1)
                    ->update(array('wpStartMin' => $data['wpEndMin']));
            }
        }
    }

    public function add_promotion(Request $request)
    {
        $data = $request->all();       

        $startTime = $data['wpStartMin'];
        $endTime = $data['wpEndMin'];
        
        $arr = explode(':', $startTime);
        $data['wpStartMin'] = 60 * $arr[0] + $arr[1];

        $arr = explode(':', $endTime);
        $data['wpEndMin'] = 60 * $arr[0] + $arr[1];

        $this->prevent_intersection($data);

        if ($data['wpPromotionRate'] < 1) {
            return -1;
        }

        DB::table('refWasherPromotion')
            ->insert($data);

            return 1;
    }
}
