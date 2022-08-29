<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PositionResource;
use App\Models\ActivePosition;

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

  public function getAll()
  {
    $positions = ActivePosition::all();

    return PositionResource::collection($positions);
  }
}