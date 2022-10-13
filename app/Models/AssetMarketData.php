<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetMarketData extends Model
{
  protected $table = 'assets_market_data';

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'asset_id',
    'current_price',
    'market_cap',
    'price_change_24h'
  ];

  public function asset()
  {
    return $this->belongsTo(Asset::class);
  }
}