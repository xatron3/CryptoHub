<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\ActivePosition;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\PositionResource;
use App\Models\Asset;

class PositionsController extends Controller
{
  public function store(Request $request)
  {
    $position = new ActivePosition();
    $position->buy_asset_id = $request->buy_asset_id;
    $position->buy_amount = $request->buy_amount;
    $position->sell_asset_id = $request->sell_asset_id;
    $position->sell_amount = $request->sell_amount;
    $position->user_id = $request->user()->id;
    $position->save();

    return response()->json(['message' => 'Position was stored.'], 200);
  }

  public function closePosition(Request $request)
  {
    $position_id = $request->id;

    $position = ActivePosition::where('id', $position_id)->first();
    $position->close_amount = $request->close_amount;
    $position->save();

    return response()->json(['message' => 'Position was closed.'], 200);
  }

  public function getAll(Request $request)
  {
    $user_id = $request->user()->id;
    $closed = $request->closed;
    $grouped = $request->grouped;
    $sell_asset = $request->sell_asset;

    if ($grouped === "true") {
      $positions = ActivePosition::groupBy('buy_asset_id', 'sell_asset_id')
        ->select(['buy_asset_id', 'sell_asset_id', 'id'])
        ->selectRaw("SUM(sell_amount) as sell_amount")
        ->selectRaw("SUM(buy_amount) as buy_amount")
        ->selectRaw('SUM(close_amount) AS close_amount');
    } else {
      $positions = ActivePosition::select(['buy_asset_id', 'sell_asset_id', 'id', 'sell_amount', 'buy_amount', 'close_amount']);
    }

    if ($closed === "true") {
      $positions
        ->selectRaw('(close_amount - sell_amount) AS profit')
        ->where([['user_id', $user_id], ['close_amount', '!=', null]]);
    } else {
      $positions
        ->where([['user_id', $user_id], ['close_amount', '=', null]]);
    }

    if ($request->has('sell_asset')) {
      $asset = Asset::where('symbol', strtolower($sell_asset))->first();

      if ($asset === null)
        return response()->json(['message' => 'Could not find sell asset: ' . $sell_asset, 'status' => 400], 200);

      $positions->where('sell_asset_id', $asset->id);
    }

    $positions = $positions->get();

    return PositionResource::collection($positions);
  }
}