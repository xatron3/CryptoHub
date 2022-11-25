<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{

  public function allUsers(Request $request)
  {
    $user = User::where('id', $request->user()->id)->first();

    if ($user->hasRole('admin')) {
      $users = User::all();
    } else {
      $users = [];
    }

    return UserResource::collection($users);
  }

  /**
   * getUser
   *
   * @param  mixed $request
   * @return void
   */
  public function getUser(Request $request)
  {
    $user = User::where('id', $request->user()->id)->get();

    return UserResource::collection($user);
  }

  /**
   * updateUser
   *
   * @param  mixed $request
   * @return void
   */
  public function updateUser(Request $request)
  {
    $user_id = $request->user()->id;
    $user = User::where('id', $user_id)->first();

    if ($request->has('name')) {
      $user->name = $request->name;
    }

    $user->save();

    $user = User::where('id', $user_id)->get();

    return UserResource::collection($user);
  }
}