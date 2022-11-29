<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\MarketData\CoingeckoController;
use App\Models\Asset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\AssetResource;
use App\Models\AssetMarketData;

class AssetsController extends Controller
{
  public function store(Request $request)
  {
    $provider_id = $request->provider_id;

    if ($request->provider === "coingecko") {
      $result = CoingeckoController::getCoingeckoData($provider_id);
      $result = $result[0];


      if (!empty($result)) {
        $asset = new Asset();
        $asset->provider_id = $provider_id;
        $asset->provider = $request->provider;
        $asset->name = $result->name;
        $asset->symbol = $result->symbol;
        $asset->logo = $result->image;
        $asset->save();
      } else {
        return response()->json(['message' => 'Asset was not found on Coingecko.', 'status' => 400], 200);
      }
    } else {
      $asset = new Asset();
      $asset->provider_id = $provider_id;
      $asset->provider = $request->provider;
      $asset->name = $request->name;
      $asset->symbol = $request->symbol;
      $asset->logo = $request->image;
      $asset->save();

      $result = [
        'current_price' => 0,
        'market_cap' => 0,
        'price_change_percentage_24h'
      ];
    }

    $marketData = new AssetMarketData();
    $marketData->asset_id = $asset->id;
    $marketData->current_price = $result->current_price;
    $marketData->market_cap = $result->market_cap;
    $marketData->price_change_24h = $result->price_change_percentage_24h;
    $marketData->save();

    return response()->json(['message' => 'Asset was added.', 'status' => 200], 200);
  }

  public function update(Request $request)
  {
    $asset_id = $request->id;

    $asset = Asset::where('id', $asset_id)->first();

    if ($asset) {
      $asset->provider_id = $request->coingecko_id;
      $asset->name = $request->name;
      $asset->symbol = $request->symbol;
      $asset->logo = $request->logo;
      $asset->save();

      return response()->json(['message' => 'Asset was updated.', 'status' => 200], 200);
    } else {
      return response()->json(['message' => 'Asset was not found.', 'status' => 400], 200);
    }
  }

  /**
   * Get assets
   */
  public function get(Request $request)
  {
    $id = $request->id;

    $fileds = ['id', 'name', 'symbol', 'logo', 'provider_id'];

    $assets = Asset::select($fileds);

    if ($request->has('id')) {
      $assets->where('id', $id);
    }

    if ($request->has('paginate')) {
      $assets = $assets->paginate();
    } else {
      $assets = $assets->get();
    }

    return AssetResource::collection($assets);
  }
}