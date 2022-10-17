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
    if ($this->id === 1) {
      $admin = 1;
    } else {
      $admin = 0;
    }

    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
      'is_admin' => $admin
    ];
  }
}