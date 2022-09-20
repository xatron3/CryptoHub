<?php

namespace App\Http\Controllers;

use App\Models\Asset;

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
    $ids = Asset::where('coingecko_id', '!=', null)->get('coingecko_id')->pluck('coingecko_id')->toArray();

    return implode(",", $ids);
  }

  public function updateCoingeckoPrices()
  {
    $ids = $this->getAllCoingeckoIds();

    $result = $this->getCoingeckoData($ids);

    foreach ($result as $data) {
      $asset = Asset::where('coingecko_id', $data->id)->first();
      $asset->current_price = $data->current_price;
      $asset->save();
    }

    return $result;
  }
}