<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\ActivePosition;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\PositionResource;

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
      $positions->where([['user_id', $user_id], ['close_amount', '!=', null]]);
    } else {
      $positions->where([['user_id', $user_id], ['close_amount', '=', null]]);
    }

    $positions = $positions->get();

    return PositionResource::collection($positions);
  }
}