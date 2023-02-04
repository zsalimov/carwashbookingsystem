<?php

namespace App\Http\Controllers\Api;

use App\Models\Defcompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    //    return Defcompany::all();

       // SELECT cId, cName, Name FROM defCompany A LEFT JOIN  refUserCompany B ON A.cId
       //= B.ucCompanyId left JOIN users C ON B.ucUserId = C.Id
       $companies = DB::table('defCompany')
        ->leftJoin('refusercompany','defCompany.cId', '=', 'refUserCompany.ucCompanyId')
        ->leftJoin('users','users.id', '=', 'refUserCompany.ucUserId')
        ->select('defCompany.cId', 'defCompany.cName', 'users.Name')
        ->get();

        return $companies;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $companies = Defcompany::all();
        
        $request->validate([
            'cName' => 'required|string|max:55|min:2'
        ]);
        $name = $request->input('cName');
        

        foreach ($companies as $company) {
            if ($company->cName == $name) {
             
               return response([
                    'code' => -1,
                    'color' => 'red',
                    'description' => 'The ' . $name . ' company already exists in the DB'
                ]);
            }
        }

        $company = Defcompany::create($request->all());
     
        return response([
                'code' => 1,               
                'description' => $name . ' successfully inserted into DB with id number: ' . $company->cId
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
        return Defcompany::find($id);
        
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
        $arr = explode('|', $id);
        $size = sizeof($arr);

        if ($size == 1) {
            $company = Defcompany::find($id);

            $uId = DB::table('refUserCompany')
                ->where('ucCompanyId', $id )->value('ucUserId'); // find user id;
            DB::table('users')
                ->where('id', $uId)
                ->limit(1)
                ->update(array('usertype' => 0)); //convert admin user to customer
            DB::table('refUserCompany')
                ->where('ucUserId', $uId)
                ->delete();                        // delete the record in the refUserCompany table
            $company->update($request->all());
            return $company;
            
        }else if ($size == 2) {
            $cId = $arr[0];
            $uId = $arr[1];
             
            $old_uId = DB::table('refUserCompany')
                ->where('ucCompanyId', $cId )->value('ucUserId'); // find user id;

                DB::table('users')
                ->where('id', $old_uId)
                ->limit(1)
                ->update(array('usertype' => 0)); //convert admin user to customer

            // 1. refUserCompany tablosunda ucUserId = $uId olan satirlar siliniz varsa onceden bilgileri temizleyebilirisin
            DB::table('refUserCompany')
                ->where('ucCompanyId', $cId)
                ->delete();
            // 2. refUserCompany tablosun $cId, $uId satiri eklenir boylece 
            DB::table('refUserCompany')
                ->insert(array('ucCompanyId' => $cId, 'ucUserId' => $uId));
            // 3. user Tablosunda id = $uId olan kulanici user type 2 yapilir.
            DB::table('users')
                ->where('id', $uId)
                ->limit(1)
                ->update(array('usertype' => 2));
        }        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Defcompany::destroy($id);
    }
    /**
     * Search the database
     *
     * @param  string  $name
     * @return \Illuminate\Http\Response
     */
    public function search($name)
    {
        return  Defcompany::where('name','like', '%'.$name.'%')->get();        
    }
    public function company_users() {
        $user = Auth::user();
        $company_id = DB::table('refUserCompany')
        ->where('ucUserId', $user["id"])->value('ucCompanyId');

        $users = DB::table('Users')
        ->join('refuserstore','users.id', '=', 'refUserstore.usUserId')
        ->join('defstore','defstore.sid', '=', 'refUserstore.usStoreId')
        ->where('defstore.scompanyid', '=', $company_id)
        ->select('users.id', 'users.name', 'users.email','users.created_at', 'defstore.sname')
        ->get();

        // SELECT users.id, users.name, users.email, users.created_at, defStore.sName FROM users 
        //    join refUserStore on users.id = refUserStore.usUserId
        //    join defStore on defStore.sId = refUserStore.usStoreId
        //    WHERE defStore.sCompanyId = 1

        return $users;      
    }

    public function dismiss($user_id) {

    // 1. User type needs to be changed from 1 to 0 
    DB::table('users')
    ->where('id', $user_id)
    ->limit(1)
    ->update(array('usertype' => 0)); //convert admin user to customer
    // 2. Delete record related to user from the RefUserStore 
    DB::table('refUserStore')
    ->where('usUserId', $user_id)
    ->delete();
    return 1;
    // 3. Future work:: Only admin from the current company can delete the user

    }
}