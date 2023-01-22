<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Defcompany;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Defcompany::all();
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
                'color' => 'green',
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
        $company = Defcompany::find($id);
        $company->update($request->all());
        return $company;
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
}
