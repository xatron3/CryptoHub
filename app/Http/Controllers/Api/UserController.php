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
    if ($request->has('id')) {
      $user = User::where('id', $request->id)->get();
    } else if ($request->user()) {
      $user = User::where('id', $request->user()->id)->get();
    } else {
      return response()->json(['message' => 'No user was found.', 'status' => 400], 200);
    }

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
    if ($request->has('user_id') && in_array('admin', $request->user()->getRoleNames()->toArray())) {
      $user_id = $request->user_id;
    } else {
      $user_id = $request->user()->id;
    }

    $user = User::where('id', $user_id)->first();

    if ($request->has('name')) {
      $user->name = $request->name;
    }

    if ($request->has('role')) {
      $user->syncRoles($request->role);
    }

    $user->save();

    $user = User::where('id', $user_id)->get();

    return UserResource::collection($user);
  }
}
