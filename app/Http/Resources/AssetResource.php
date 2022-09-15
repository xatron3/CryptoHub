<?php

namespace App\Http\Resources;

use App\Models\Asset;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetResource extends JsonResource
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
      'name' => $this->name,
      'symbol' => $this->symbol,
      'logo' => $this->logo,
      'current_price' => $this->current_price,
      'market_cap' => $this->market_cap,
      'coingecko_id' => $this->coingecko_id
    ];
  }
}