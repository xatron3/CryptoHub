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
    $user = $request->user();
    $userId = $user->hasRole('admin') && $request->has('id') ? $request->id : $user->id;

    $positions = ActivePosition::query();
    $closed = $request->closed;
    $grouped = $request->grouped;
    $sellAsset = $request->sell_asset;
    $buyAsset = $request->buy_asset;

    $positions->where('user_id', $userId);

    if ($closed === 'true') {
      $positions->whereNotNull('close_amount');
    } else {
      $positions->whereNull('close_amount');
    }

    if ($sellAsset) {
      $asset = Asset::where('symbol', strtolower($sellAsset))->first();
      if (!$asset) {
        return response()->json(['message' => 'Could not find sell asset: ' . $sellAsset, 'status' => 400], 200);
      }
      $positions->where('sell_asset_id', $asset->id);
    }

    if ($buyAsset) {
      $asset = Asset::where('symbol', strtolower($buyAsset))->first();
      if (!$asset) {
        return response()->json(['message' => 'Could not find buy asset: ' . $buyAsset, 'status' => 400], 200);
      }
      $positions->where('buy_asset_id', $asset->id);
    }

    if ($grouped === 'true') {
      $positions->select([
        'buy_asset_id',
        'sell_asset_id',
        'id',
        DB::raw('SUM(sell_amount) as sell_amount'),
        DB::raw('SUM(buy_amount) as buy_amount'),
        DB::raw('SUM(close_amount) as close_amount'),
      ])->groupBy('buy_asset_id', 'sell_asset_id');
      if ($closed === 'true') {
        $positions->selectRaw('(SUM(close_amount) - SUM(sell_amount)) AS profit');
      } else {
        $positions->selectRaw('(close_amount - sell_amount) AS profit');
      }
    } else {
      $positions->select([
        'buy_asset_id',
        'sell_asset_id',
        'id',
        'sell_amount',
        'buy_amount',
        'close_amount',
      ]);
      if ($closed === 'true') {
        $positions->selectRaw('(close_amount - sell_amount) AS profit');
      }
    }

    $count = $positions->count();
    if ($count <= 0) {
      return response()->json(['data' => []], 200);
    }

    $positions = $positions->get();
    return PositionResource::collection($positions);
  }

  /**
   * Import positions. 
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
