<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\ActivePosition;
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

    return response()->json(['success' => 'Position was stored.'], 200);
  }

  public function getAll(Request $request)
  {
    $user_id = $request->user()->id;

    if ($request->grouped === "true") {
      $positions = ActivePosition::groupBy('buy_asset_id')->where('user_id', $user_id)->selectRaw("SUM(sell_amount) as sell_amount")
        ->selectRaw("SUM(buy_amount) as buy_amount")->selectRaw('buy_asset_id')->selectRaw('sell_asset_id')->get();
    } else {
      $positions = ActivePosition::where('user_id', $user_id)->get();
    }

    return PositionResource::collection($positions);
  }
}