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
  /**
   * Store new position
   */
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

  /**
   * Close open position
   */
  public function closePosition(Request $request)
  {
    $position_id = $request->id;

    $position = ActivePosition::where('id', $position_id)->first();
    $position->close_amount = $request->close_amount;
    $position->save();

    return response()->json(['message' => 'Position was closed.'], 200);
  }

  /**
   * Get all positions
   */
  public function getAll(Request $request)
  {
    if ($request->has('user_id') && in_array('admin', $request->user()->getRoleNames()->toArray())) {
      $user_id = $request->user_id;
    } else {
      $user_id = $request->user()->id;
    }


    $closed = $request->closed;
    $grouped = $request->grouped;
    $sell_asset = $request->sell_asset;
    $buy_asset = $request->buy_asset;

    if (
      ActivePosition::where([['user_id', $user_id], ['close_amount', '=', null]])->count() <= 0 && $closed !== "true" ||
      ActivePosition::where([['user_id', $user_id], ['close_amount', '!=', null]])->count() <= 0 && $closed === "true"
    ) {
      return response()->json(['data' => []], 200);
    }

    if ($grouped === "true") {
      $positions = ActivePosition::select(['buy_asset_id', 'sell_asset_id', 'id'])
        ->selectRaw("SUM(sell_amount) as sell_amount")
        ->selectRaw("SUM(buy_amount) as buy_amount")
        ->selectRaw('SUM(close_amount) AS close_amount')
        ->groupBy('buy_asset_id', 'sell_asset_id');
    } else {
      $positions = ActivePosition::select(['buy_asset_id', 'sell_asset_id', 'id', 'sell_amount', 'buy_amount', 'close_amount']);
    }

    // Get closed positions if true else all else
    if ($closed === "true") {
      if ($grouped === "true") {
        $positions->selectRaw('(SUM(close_amount) - SUM(sell_amount)) AS profit');
      } else {
        $positions->selectRaw('(close_amount - sell_amount) AS profit');
      }

      $positions->where([['user_id', $user_id], ['close_amount', '!=', null]]);
    } else {
      $positions
        ->where([['user_id', $user_id], ['close_amount', '=', null]]);
    }

    // Select by sell asset symbol
    if ($request->has('sell_asset')) {
      $asset = Asset::where('symbol', strtolower($sell_asset))->first();

      if ($asset === null)
        return response()->json(['message' => 'Could not find sell asset: ' . $sell_asset, 'status' => 400], 200);

      $positions->where('sell_asset_id', $asset->id);
    }

    // Select by buy asset symbol
    if ($request->has('buy_asset')) {
      $asset = Asset::where('symbol', strtolower($buy_asset))->first();

      if ($asset === null)
        return response()->json(['message' => 'Could not find buy asset: ' . $buy_asset, 'status' => 400], 200);

      $positions->where('buy_asset_id', $asset->id);
    }

    $positions = $positions->get();

    return PositionResource::collection($positions);
  }

  /**
   * Import positions that got exported. 
   */
  public function importPositions(Request $request)
  {
    if ($request->has('import_data')) {
      $import_data = json_decode($request->import_data);

      if (!empty($import_data)) {
        $import_amount = count($import_data);
        $completed = 0;
        $failed = 0;

        foreach ($import_data as $data) {
          $buy_asset = Asset::where('symbol', $data->buy_asset_symbol)->first();
          $sell_asset = Asset::where('symbol', $data->sell_asset_symbol)->first();

          if ($buy_asset && $sell_asset) {
            $position = new ActivePosition();
            $position->user_id = $request->user()->id;
            $position->buy_asset_id = $buy_asset->id;
            $position->sell_asset_id = $sell_asset->id;
            $position->buy_amount = $data->buy_amount;
            $position->sell_amount = $data->sell_amount;
            $position->save();
            $completed++;
          } else {
            $failed++;
          }
        }

        $import_data = response()->json(
          [
            'message' => 'Imported ' . $completed . '/' . $import_amount . ' with ' . $failed . ' failed',
            'status' => 200
          ],
          200
        );
      } else {
        $import_data = response()->json(['message' => 'import_data can\'t be empty.', 'status' => 400], 200);
      }
    } else {
      $import_data = response()->json(['message' => 'Please enter valid import_data', 'status' => 400], 200);
    }

    return $import_data;
  }
}