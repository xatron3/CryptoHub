<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    // Get user role
    if ($this->hasRole('admin')) {
      $permission = 100;
      $role = 'admin';
    } else if ($this->hasRole('tester')) {
      $permission = 20;
      $role = 'tester';
    } else {
      $permission = 1;
      $role = 'trial';
    }

    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
      'permission' => [
        'level' => $permission,
        'role' => $role
      ]
    ];
  }
}