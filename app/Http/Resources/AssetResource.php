<?php

namespace App\Http\Resources;

use App\Models\Asset;
use App\Models\AssetMarketData;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetResource extends JsonResource
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
      $marketData = (object) $marketData;
      $marketData->current_price = 0;
      $marketData->price_change_24h = 0;
      $marketData->market_cap = 0;
    }

    return [
      'id' => $this->id,
      'name' => $this->name,
      'symbol' => $this->symbol,
      'logo' => $this->logo,
      'current_price' => $marketData->current_price,
      'price_change_24h' => $marketData->price_change_24h,
      'market_cap' => $marketData->market_cap,
      'provider_id' => $this->provider_id
    ];
  }
}