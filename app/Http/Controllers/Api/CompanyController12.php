<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Defcompany;
use App\Http\Requests\StoreDefcompanyRequest;
use App\Http\Requests\UpdateDefcompanyRequest;
use App\Http\Resources\CompanyResource;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CompanyResource::collection(
            Defcompany::query()
                ->orderBy('cId', 'desc')
                ->paginate(10)
                
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDefcompanyRequest $request)
    {
        $data = $request->validated();        
        $company = Defcompany::create($data);
        return response(new CompanyResource($company), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Defcompany  $defcompany
     * @return \Illuminate\Http\Response
     */
    public function show(Defcompany $defcompany)
    {
                
        return new CompanyResource($defcompany);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDefcompanyRequest  $request
     * @param  \App\Models\Defcompany  $defcompany
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDefcompanyRequest $request, Defcompany $defcompany)
    {
        $data = $request->validated();        
        // $name = $data->cName;
        // $companies = Defcompany::all();
        
        

        $defcompany->update($data);
         
        // return response([
        //     'code' => $company->cId,
        //     'description' => $name . ' inserted into DB with id ' . $company->cId
        // ]);
        return new CompanyResource($defcompany);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Defcompany  $defcompany
     * @return \Illuminate\Http\Response
     */
    public function destroy(Defcompany $defcompany)
    {
        $defcompany->delete();

        return response("", 204);
    }
}
