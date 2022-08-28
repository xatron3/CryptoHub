<?php

namespace App\Http\Controllers\Api;

use App\Models\Asset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AssetsController extends Controller
{
  //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum

  public function store(Request $request)
  {
    $coingecko_id = $request->coingecko_id;

    $asset = Asset::where('coingecko_id', $coingecko_id)->first();

    if (!$asset) {
      $result = $this->getCoingeckoData($request->coingecko_id);

      if (!empty($result)) {
        $result = $result[0];

        $asset = new Asset();
        $asset->coingecko_id = $coingecko_id;
        $asset->name = $result->name;
        $asset->symbol = $result->symbol;
        $asset->logo = $result->image;
        $asset->current_price = $result->current_price;
        $asset->market_cap = $result->market_cap;
        $asset->save();

        return response()->json(['success' => 'Asset was created.'], 200);
      } else {
        return response()->json(['error' => 'Asset was not found on Coingecko.'], 400);
      }
    } else {
      return response()->json(['error' => 'Asset already exists.'], 400);
    }
  }

  public function getAll()
  {
    $assets = Asset::all();

    return $assets;
  }

  public function getCoingeckoData($coingecko_id)
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