<?php

namespace App\Http\Resources;

use App\Models\Asset;
use App\Models\AssetMarketData;
use Illuminate\Http\Resources\Json\JsonResource;

class PositionResource extends JsonResource
{
    public function getAssetMarketData($id)
    {
        $marketData = AssetMarketData::where('asset_id', $id)->first();

        return $marketData;
    }

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
        $priceEach = $this->sell_amount / $this->buy_amount;

        $currentPriceEach = $this->getAssetMarketData($this->buy_asset_id)->current_price / $this->getAssetMarketData($this->sell_asset_id)->current_price;

        if ($this->profit === null) {
            $this->profit = ($this->buy_amount * $currentPriceEach) - ($this->sell_amount);
        }

        return [
            'id' => $this->id,
            'buy_asset_id' => $this->buy_asset_id,
            'buy_amount' => $this->buy_amount,
            'buy_price' => $priceEach,
            'sell_asset_id' => $this->sell_asset_id,
            'sell_amount' => $this->sell_amount,
            'close_amount' => $this->close_amount,
            'profit' => $this->profit
        ];
    }
}