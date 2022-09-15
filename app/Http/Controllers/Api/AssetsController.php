<?php

namespace App\Http\Controllers\Api;

use App\Models\Asset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\AssetResource;

class AssetsController extends Controller
{
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
        return response()->json(['error' => 'Asset was not found on Coingecko.'], 422);
      }
    } else {
      return response()->json(['error' => 'Asset already exists.'], 422);
    }
  }

  public function getAll()
  {
    $assets = Asset::orderBy('name')->get();

    return AssetResource::collection($assets);
  }
}