<?php

namespace App\Console\Commands;


use App\Events\AssetsUpdated;
use Illuminate\Console\Command;
use App\Http\Controllers\Api\AssetsController;
use App\Http\Controllers\MarketData\CoingeckoController;

class CoingeckoPrice extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'update:coingecko';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Fetch current price of all coingecko assets';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle()
  {
    $coingecko = new CoingeckoController();
    $coingecko->updateCoingeckoPrices();
    $ac = new AssetsController();
    event(new AssetsUpdated($ac->getAssetMarketData()));
    $this->info('Coingecko Price Updated');
  }
}
