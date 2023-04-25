<?php

namespace App\Http\Resources;

use App\Models\AssetMarketData;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetMarketDataResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $marketData = AssetMarketData::where('asset_id', $this->id)->first();

    if ($marketData === null) {
      $marketData = (object)[];
      $marketData->current_price = 0;
      $marketData->price_change_24h = 0;
      $marketData->market_cap = 0;
    }

    return [
      'id' => $this->id,
      'current_price' => $marketData->current_price,
      'price_change_24h' => $marketData->price_change_24h,
      'market_cap' => $marketData->market_cap,
    ];
  }
}
