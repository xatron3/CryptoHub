<?php

namespace App\Http\Resources;

use App\Models\Asset;
use Illuminate\Http\Resources\Json\JsonResource;

class PositionResource extends JsonResource
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
        $price = $this->sell_amount / $this->buy_amount . ' ' . strtoupper($this->getAssetData($this->sell_asset_id)->symbol);

        $currentSellPrice = $this->getAssetData($this->buy_asset_id)->current_price / $this->getAssetData($this->sell_asset_id)->current_price;

        return [
            'id' => $this->id,
            'buy_amount' => $this->buy_amount,
            'buy_asset' => $this->getAssetData($this->buy_asset_id)->name,
            'sell_amount' => $this->sell_amount,
            'sell_asset' => $this->getAssetData($this->sell_asset_id)->name,
            'price' => $price,
            'current_sell_price' => $currentSellPrice
        ];
    }
}