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
  public function storeRole(Request $request)
  {
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

    return response()->json(['message' => $message, 'status' => $status], 200);
  }

  public function getRoles(Request $request)
  {
    $roles = Role::all();

    return PermissionResource::collection($roles);
  }
}