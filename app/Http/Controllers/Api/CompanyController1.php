<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Defcompany;


class CompanyController extends Controller
{
    public function index() {
        $companies = Defcompany::all();
        return $companies;
    }

    public function get($id) {
        $company = Defcompany::where('cId', '=', $id)->first();
        return $company;
    }

    public function store(StoreCompanyRequest $request)
    {
        $data = $request->validated(); 
        $name = $data->cName;
        $companies = $this->index();
        foreach ($companies as $company) {
            if ($company->cName == $name) {

                return response([
                    'code' => -1,
                    'description' => $name . ' already exists in DB!'
                ]);
            }
        }

        $company = Defcompany::create($data);
       
        return response([
            'code' => $company->cId,
            'description' => $name . ' inserted into DB with id ' . $company->cId
        ]);
    }

    public function update(UpdateCompanyRequest $request, Defcompany $company)
    {
        $data = $request->validated();
        $company->update($data);

        return $company;
    }
}
