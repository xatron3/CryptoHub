<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;


use Illuminate\Database\Eloquent\Model;

class ActivePosition extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'buy_asset_id',
    'buy_amount',
    'sell_amount',
    'sell_asset_id',
    'close_amount',
    'user_id'
  ];
}