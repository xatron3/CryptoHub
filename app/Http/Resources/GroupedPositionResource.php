<?php

namespace App\Http\Resources;

use App\Models\Asset;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupedPositionResource extends JsonResource
{
  public function getAssetData($id)
  {
    $asset = Asset::where('id', $id)->first();

    return $asset;
  }
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $buySymbol = strtoupper($this->getAssetData($this->buy_asset_id)->symbol);
    $sellSymbol = strtoupper($this->getAssetData($this->sell_asset_id)->symbol);

    $priceEach = $this->total_sell_amount / $this->total_buy_amount;

    if ($priceEach >= 1) {
      $priceEachFormatted = number_format($priceEach, 2) . ' ' . $sellSymbol;
    } else {
      $priceEachFormatted = number_format($priceEach, 5) . ' ' . $sellSymbol;
    }

    $currentPriceEach = $this->getAssetData($this->buy_asset_id)->current_price / $this->getAssetData($this->sell_asset_id)->current_price;

    if ($currentPriceEach >= 1) {
      $currentPriceEachFormatted =  number_format($currentPriceEach, 2) . ' ' . $sellSymbol;
    } else {
      $currentPriceEachFormatted =  number_format($currentPriceEach, 5) . ' ' . $sellSymbol;
    }

    return [
      'id' => $this->id,
      'buy_logo' => $this->getAssetData($this->buy_asset_id)->logo,
      'buy_amount' => $this->total_buy_amount . ' ' . $buySymbol,
      'sell_logo' => $this->getAssetData($this->sell_asset_id)->logo,
      'sell_amount' => $this->total_sell_amount . ' ' . $sellSymbol,
      'price' => $priceEachFormatted,
      'current_sell_price' => $currentPriceEachFormatted
    ];
  }
}