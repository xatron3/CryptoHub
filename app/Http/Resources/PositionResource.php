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
        $buySymbol = strtoupper($this->getAssetData($this->buy_asset_id)->symbol);
        $sellSymbol = strtoupper($this->getAssetData($this->sell_asset_id)->symbol);

        $priceEach = $this->sell_amount / $this->buy_amount;
        $priceEachFormatted = number_format($priceEach, zeros_after_dot($priceEach));

        $currentPriceEach = $this->getAssetData($this->buy_asset_id)->current_price / $this->getAssetData($this->sell_asset_id)->current_price;
        $currentPriceEachFormatted =  number_format($currentPriceEach, zeros_after_dot($currentPriceEach));

        return [
            'id' => $this->id,
            'buy_logo' => $this->getAssetData($this->buy_asset_id)->logo,
            'buy_symbol' => $buySymbol,
            'buy_amount' => $this->buy_amount,
            'sell_logo' => $this->getAssetData($this->sell_asset_id)->logo,
            'sell_symbol' => $sellSymbol,
            'sell_amount' => $this->sell_amount,
            'price' => $priceEachFormatted,
            'close_amount' => $this->close_amount,
            'current_sell_price' => $currentPriceEachFormatted,
            'profit' => $this->profit
        ];
    }
}