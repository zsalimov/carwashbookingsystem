<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var User  $user   **/
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),            
        ]);

        $token = $user->createToken('main')->plainTextToken;
        
        //return response(compact('user', 'token')); 
        // this is the same as the previous one
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
    public function login(LoginRequest $request)
    {   
        
        $credentials = $request->validated();

        /** @var User $user **/
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'The provided credentials do not match our records.'
            ], 422);
            
            
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;   
        // $redirect_url = '/dashboard'; 
        // if ($user->usertype == 'StoreAdmin') {
        //     $redirect_url = '/store-dashboard';
        // } elseif ($user->usertype == 'CompanyAdmin') {
        //     $redirect_url = '/company-dashboard';
        // } elseif ($user->usertype == 'SiteAdmin') {
        //     $redirect_url = '/site-dashboard';
        // }               
        
        return [
            'user' => $user,
            'token' => $token, 
            // 'redirect_url' => $redirect_url         
        ];
    }
    
    public function logout(Request $request)
    {
        /** @var User $user **/
         $user = Auth::user();
       // $user = $request->$user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
