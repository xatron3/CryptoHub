<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'title' => $this->title,
      'content' => $this->content,
      'slug' => $this->slug,
      'updated' => $this->updated_at->format('Y-m-d H:i:s'),
      'created' => $this->created_at->format('Y-m-d H:i:s')
    ];
  }
}
