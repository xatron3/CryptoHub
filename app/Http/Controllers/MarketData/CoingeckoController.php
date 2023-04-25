<?php

namespace App\Http\Controllers\MarketData;

use App\Models\Asset;
use App\Events\AssetsUpdated;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\ClientException;
use App\Http\Controllers\AssetMarketDataController;
use App\Http\Controllers\Api\AssetsController;

class CoingeckoController extends Controller
{
  public static function getCoingeckoData($ids)
  {
    $client = new \GuzzleHttp\Client([
      'curl' => array(CURLOPT_SSL_VERIFYPEER => false)
    ]);

    try {
      $result = $client->get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' . $ids);

      $response = array(
        'data' => json_decode($result->getBody()),
        'status' => $result->getStatusCode()
      );
    } catch (ClientException $e) {
      $response = array(
        'data' => $e->getMessage(),
        'status' => $e->getResponse()->getStatusCode()
      );
    }

    return (object)$response;
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

    if ($result->status !== 200) {
      Log::info($result->data);
    } else {
      foreach ($result->data as $data) {
        $asset = Asset::where('provider_id', $data->id)->first();

        $assetData = (object) array(
          'asset_id' => $asset->id,
          'current_price' => $data->current_price,
          'market_cap' => $data->market_cap,
          'price_change_24h' => $data->price_change_percentage_24h,
        );

        $assetMarketDataController->update($assetData);
      }
    }

    return $result;
  }
}
