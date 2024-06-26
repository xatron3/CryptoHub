<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Asset extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'symbol',
    'logo',
    'provider_id',
    'provider'
  ];

  /**
   * Always return symbol in uppercase
   */
  protected function symbol(): Attribute
  {
    return Attribute::make(
      get: fn ($value) => strtoupper($value),
    );
  }

  public function assetMarketData()
  {
    return $this->hasOne(AssetMarketData::class, 'asset_id');
  }
}