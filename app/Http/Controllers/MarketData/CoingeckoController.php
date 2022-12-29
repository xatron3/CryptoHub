<?php

namespace App\Http\Controllers\MarketData;

use App\Models\Asset;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AssetMarketDataController;

class CoingeckoController extends Controller
{
  public static function getCoingeckoData($coingecko_id)
  {
    $client = new \GuzzleHttp\Client(array('curl' => array(CURLOPT_SSL_VERIFYPEER => false)));

    $result = $client->get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' . $coingecko_id);

    return json_decode($result->getBody());
  }

  public function getAllCoingeckoIds()
  {
    $ids = Asset::where('provider_id', '!=', null)->get('provider_id')->pluck('provider_id')->toArray();

    return implode(",", $ids);
  }

  public function updateCoingeckoPrices()
  {
    $assetMarketDataController = new AssetMarketDataController();

    $ids = $this->getAllCoingeckoIds();

    $result = $this->getCoingeckoData($ids);

    foreach ($result as $data) {
      $asset = Asset::where('provider_id', $data->id)->first();

      $assetData = (object) array(
        'asset_id' => $asset->id,
        'current_price' => $data->current_price,
        'market_cap' => $data->market_cap,
        'price_change_24h' => $data->price_change_percentage_24h,
      );

      $assetMarketDataController->update($assetData);
    }

    return $result;
  }
}