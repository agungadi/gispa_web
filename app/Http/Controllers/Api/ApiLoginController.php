<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Illuminate\Http\Request;

class ApiLoginController extends Controller
{
    //
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');


        if ($token = auth('api')->attempt($credentials))
        {
            $roles = auth('api')->user()->roles->pluck('name')->first();

            if($roles == "Survei"){
                return response()->json([
                    'success' => true,
                    'pesan' => 'Berhasil Login',
                    'roles' => $roles,
                    'data' => [
                        'user' =>response()->json(auth('api')->user())->original
                        , 'token' => $this->respondWithToken($token)->original['access_token']
                    ]
                ], 200);
            }else{
                return response()->json([
                    'success' => true,
                    'pesan' => 'Roles Tidak Boleh Login',
                    'roles' => $roles,
                ], 200);
            }


        }

        return response()->json([
            'success' => false,
            'pesan' => 'Username / Password Salah',
            'data' => null
        ], 200);
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json([
            'success' => true,
            'pesan' => 'Berhasil Logout',
        ], 200);
    }


    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 99999999999999999999999
        ]);
    }



    public function guard()
    {
        return Auth::guard();
    }
}
