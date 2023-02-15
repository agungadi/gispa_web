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

        if ($token = auth('api')->attempt($credentials)) {
            return response()->json([
                'success' => true,
                'pesan' => 'Berhasil Login',
                'data' => [
                    'user' =>response()->json(auth('api')->user())->original
                    , 'token' => $this->respondWithToken($token)->original['access_token']
                ]
            ], 200);
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
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }



    public function guard()
    {
        return Auth::guard();
    }
}
