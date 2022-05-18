<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\user;
use App\Models\Product;
use Auth;
use Illuminate\Support\Facades\Validator;
use DB;

class UserController extends Controller
{
    public function login(Request $request){
        try
        {
            $rules = [
                'email' => 'required|email',
                'password' => 'required',
            ];

            $validator = Validator::make($request->all() , $rules);
            if($validator->fails())
            {
                return response()->json(['status' => false, 'message' => $validator->errors() ], 400);
            }

            $data = $request->all();

            if (!auth()->attempt($data)) {
                return response()->json(['status' => false, 'message' => 'Incorrect Details. Please try again' ], 401);
            }

            $token = auth()->user()->createToken('authToken')->accessToken;

            return response(['status' => true,'user' => auth()->user(), 'token' => $token]);
        }
        catch(\Exception $e)
        {
            return response()->json(['status' => false, 'message' => $e->getMessage() ], 500);
        }
    }
    public function register(Request $request){
        try{
            $rules = [
                'name' => 'required|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|confirmed',
                'password_confirmation' => 'required'
            ];

            $validator = Validator::make($request->all() , $rules);
            if($validator->fails())
            {
                return response()->json(['status' => false, 'message' => $validator->errors() ], 400);
            }

            $data = $request->all();
            $data['password'] = bcrypt($request->password);
            $data['visible_password'] = $request->password;
            $user = User::create($data);
            $token = $user->createToken('API Token')->accessToken;
            return response([ 'status' => true,'user' => $user, 'token' => $token]);

        }catch(\Exception $e){
            return response()->json(['status' => false, 'message' => $e->getMessage() ], 500);
        }
    }
    public function product(Request $request){
        try
            {
                $find = $request->search;
                if($find) {
                    $product = Product::where('name','LIKE',"%$find%")->orWhere('auther_name','LIKE',"%$find%")->orWhere(DB::raw('DATE_FORMAT(products.created_at,"%m-%d-%Y")'),'LIKE',"%$find%")->get();
                } else {
                    $product = Product::all();
                }

                return response([ 'status' => true,'data' => $product]);
            }
        catch(\Exception $e)
        {
            return response()->json(['status' => false, 'message' => $e->getMessage() ], 500);
        }
    }
    public function logout(){
        try
            {
                $auth_user = Auth::user()->token();
                $auth_user->revoke();
                return response()->json(['status' => true, 'data' =>''], 200);
            }
        catch(\Exception $e)
        {
            return response()->json(['status' => false, 'message' => $e->getMessage() ], 500);
        }
    }
}
