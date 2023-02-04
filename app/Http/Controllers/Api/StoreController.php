<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Defstore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoredefStoreRequest;


class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $company_id = DB::table('refUserCompany')
            ->where('ucUserId', $user["id"])->value('ucCompanyId');
            

        return DB::table('defStore')
            ->join('defCompany', 'defStore.sCompanyId', '=', 'defCompany.cId')
            ->leftjoin('refUserStore', 'refUserStore.usStoreId', '=', 'defStore.sId')
            ->leftjoin('users', 'users.Id', '=', 'refUserStore.usUserId')
            ->where('sCompanyId', '=', $company_id)
            ->select('defStore.sId', 'defStore.sName', 'defCompany.cName', 'users.Name')
            ->get(); 
            
        // SELECT defStore.sId, defStore.sName, defCompany.cName, FROM defStore 
        // JOIN defCompany ON defStore.sCompanyId = defCompany.cId
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoredefStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $company_id = DB::table('refUserCompany')
            ->where('ucUserId', $user["id"])->value('ucCompanyId');

        $request->validate([
            'sName' => 'required|string|max:55|min:2'

        ]);
        $data = $request->all();
        $data['sCompanyId'] = $company_id;
        $name = $request->input('sName');

        $store = Defstore::create($data);

        return response([
            'code' => 1,
            'description' => $name . ' successfully inserted into DB with id number: ' . $store->Id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\defStore  $defStore
     * @return \Illuminate\Http\Response
     */
    public function show(defStore $defStore)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatedefStoreRequest  $request
     * @param  \App\Models\defStore  $defStore
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $arr = explode('|', $id);
        $size = sizeof($arr);

        if ($size == 1) {
            $store = Defstore::find($id);

            $uId = DB::table('refUserStore')
                ->where('usStoreId', $id)->value('usUserId'); // find user id;
            DB::table('users')
                ->where('id', $uId)
                ->limit(1)
                ->update(array('usertype' => 0)); //convert admin user to customer
            DB::table('refUserStore')
                ->where('usUserId', $uId)
                ->delete();                        // delete the record in the refUserCompany table
            $store->update($request->all());
            return $store;
        } else if ($size == 2) {
            $sId = $arr[0];
            $uId = $arr[1];

            $old_uId = DB::table('refUserStore')
                ->where('usStoreId', $sId)->value('usUserId'); // find user id;

            DB::table('users')
                ->where('id', $old_uId)
                ->limit(1)
                ->update(array('usertype' => 0)); //convert admin user to customer

            // 1. refUserCompany tablosunda ucUserId = $uId olan satirlar siliniz varsa onceden bilgileri temizleyebilirisin
            DB::table('refUserStore')
                ->where('usStoreId', $sId)
                ->delete();
            // 2. refUserCompany tablosun $cId, $uId satiri eklenir boylece 
            DB::table('refUserStore')
                ->insert(array('usStoreId' => $sId, 'usUserId' => $uId));
            // 3. user Tablosunda id = $uId olan kulanici user type 2 yapilir.
            DB::table('users')
                ->where('id', $uId)
                ->limit(1)
                ->update(array('usertype' => 1));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\defStore  $defStore
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // 1. RefUserStore tablosunda usStorId = $id kalmamali
        $users = DB::table('refUserStore')
            ->where('usStoreId', $id)->select('usUserId')->get(); // find all user ids;
            
        DB::table('refUserStore')
            ->where('usStoreId', $id)
            ->delete();

        // 2. RefUserStore tablosundan usUserIdnin User tablosunda Idsi usertype sifira cekilmeli.
        foreach ($users as $user) {
            DB::table('Users')
                ->where('id', $user->usUserId)
                ->update(array('usertype' => 0));
        }

        return DB::table('defStore')
            ->where('sId', $id)
            ->delete();
    }

    public function get_store($id)
    {
        return Defstore::where('sId', '=', $id)->first();
    }


    public function users_0()
    {
        return User::where('usertype', '=', 0)->get();
    }
}
