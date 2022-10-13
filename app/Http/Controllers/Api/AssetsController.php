<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\CoingeckoController;
use App\Models\Asset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\AssetResource;
use App\Models\AssetMarketData;

class AssetsController extends Controller
{
  public function store(Request $request)
  {
    $coingecko_id = $request->coingecko_id;

    $asset = Asset::where('coingecko_id', $coingecko_id)->first();

    if (!$asset) {
      $result = CoingeckoController::getCoingeckoData($request->coingecko_id);

      if (!empty($result)) {
        $result = $result[0];

        $asset = new Asset();
        $asset->coingecko_id = $coingecko_id;
        $asset->name = $result->name;
        $asset->symbol = $result->symbol;
        $asset->logo = $result->image;
        $asset->save();

        $marketData = new AssetMarketData();
        $marketData->asset_id = $asset->id;
        $marketData->current_price = $result->current_price;
        $marketData->market_cap = $result->market_cap;
        $marketData->price_change_24h = $result->price_change_percentage_24h;
        $marketData->save();

        return response()->json(['message' => 'Asset was added.', 'status' => 200], 200);
      } else {
        return response()->json(['message' => 'Asset was not found on Coingecko.', 'status' => 400], 200);
      }
    } else {
      return response()->json(['message' => 'Asset already exists.', 'status' => 400], 200);
    }
  }

  /**
   * Get assets
   */
  public function get(Request $request)
  {
    $id = $request->id;
    $sort_by = $request->sort_by;

    $fileds = ['id', 'name', 'symbol', 'logo', 'current_price', 'market_cap', 'coingecko_id'];

    $assets = Asset::select($fileds);

    if ($request->has('id')) {
      $assets->where('id', $id);
    }

    if ($request->has('sort_by')) {
      if (in_array($sort_by, $fileds)) {
        if ($sort_by == "market_cap") $direction = 'desc';
        else $direction = 'asc';

        $assets->orderBy($sort_by, $direction);
      } else {
        return response()->json(['message' => 'Sort by key does not exist.', 'status' => 400], 200);
      }
    }

    $assets = $assets->get();

    return AssetResource::collection($assets);
  }
}