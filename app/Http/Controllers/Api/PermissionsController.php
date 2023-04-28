<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\UserResource;

class PermissionsController extends Controller
{

  /**
   * storeRole
   *
   * @param  mixed $request
   * @return void
   */
  public function store(Request $request)
  {
    if ($request->user()->hasRole('admin')) {
      if ($request->has('name')) {
        $name = $request->name;
        $role = Role::where('name', $name)->first();

        if ($role) {
          $message = 'Role Already Exists';
          $status = 400;
        } else {
          Role::create(['name' => $name]);
          $message = 'Role Created';
          $status = 200;
        }
      } else {
        $message = 'The role needs a name';
        $status = 400;
      }
    } else {
      $message = 'Only admins can add roles';
      $status = 400;
    }

    return response()->json(['message' => $message, 'status' => $status], 200);
  }

  public function update(Request $request)
  {
    $role = Role::where('id', $request->id)->first();

    if ($role) {
      if ($request->has('name')) {
        $role->name = $request->name;
      }

      $role->save();

      return response()->json(['message' => 'Role got updated', 'status' => 200], 200);
    } else {
      return response()->json(['message' => 'Role not found', 'status' => 400], 200);
    }
  }

  /**
   * getRoles
   *
   * @param  mixed $request
   * @return void
   */
  public function get(Request $request)
  {
    $roles = Role::all();

    if ($request->has('id')) {
      $roles = $roles->where('id', $request->id);
    }

    return PermissionResource::collection($roles);
  }
}
