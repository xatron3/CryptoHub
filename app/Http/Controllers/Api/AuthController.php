<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserResource;
use App\Http\Controllers\Controller;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
  /**
   * login
   *
   * @param  mixed $request
   * @return void
   */
  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email',
      'password' => 'required',
    ]);

    if ($validator->fails()) {
      return response()->json(['message' => 'Fill all fields', 'status' => 400], 200);
    }

    if (!$token = JWTAuth::attempt($validator->validated())) {
      return response()->json(['message' => 'Wrong email or password', 'status' => 400], 200);
    }
    return $this->createNewToken($token);
  }

  /**
   * register
   *
   * @param  mixed $request
   * @return void
   */
  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name' => 'required|string|between:2,100',
      'email' => 'required|string|email|max:100|unique:users',
      'password' => 'required|confirmed|',
    ]);

    if ($validator->fails()) {
      return response()->json(['error' => $validator->errors()->toJson()], 400);
    }

    $user = User::create(array_merge(
      $validator->validated(),
      ['password' => bcrypt($request->password)]
    ));

    if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
      return response()->json(['error' => 'Wrong email or password'], 400);
    }
    return $this->createNewToken($token);
  }

  /**
   * createNewToken
   *
   * @param  mixed $token
   * @return void
   */
  protected function createNewToken($token)
  {
    $user = User::where('id', auth()->user()->id)->get();

    return response()->json([
      'status' => 200,
      'access_token' => $token,
      'token_type' => 'bearer',
      'user' => UserResource::collection($user)
    ]);
  }

  /**
   * refresh
   *
   * @return void
   */
  public function refresh()
  {
    return $this->createNewToken(auth()->refresh());
  }
}