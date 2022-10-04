<?php

namespace App\Http\Controllers;

use App\Models\AssetMarketData;
use Illuminate\Http\Request;

class AssetMarketDataController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($data)
    {
        $assetMarketData = new AssetMarketData();
        $assetMarketData->asset_id = $data->asset_id;
        $assetMarketData->current_price = $data->current_price;
        $assetMarketData->market_cap = $data->market_cap;
        $assetMarketData->price_change_24h = $data->price_change_24h;
        $assetMarketData->save();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AssetMarketData  $assetMarketData
     * @return \Illuminate\Http\Response
     */
    public function update($data)
    {
        $assetMarketData = AssetMarketData::where('asset_id', $data->asset_id)->get();

        if ($assetMarketData->isEmpty()) {
            $this->store($data);
        } else {
            $assetMarketData = $assetMarketData->first();

            $assetMarketData->current_price = $data->current_price;
            $assetMarketData->market_cap = $data->market_cap;
            $assetMarketData->price_change_24h = $data->price_change_24h;

            $assetMarketData->save();
        }
    }
}