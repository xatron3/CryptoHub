<?php

namespace App\Http\Controllers\MarketData;

use App\Models\Asset;
use App\Http\Controllers\Controller;

class PriceController extends Controller
{
  public function updateMarketData($asset_id)
  {
    $asset = Asset::where('id', $asset_id)->first();

    $provider = $asset->provider;

    // Only for providers that needs individual handling
    switch ($provider) {
      case "coingecko":
        return;
        break;
    }
  }
}
