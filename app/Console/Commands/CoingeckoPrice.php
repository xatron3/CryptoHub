<?php

namespace App\Console\Commands;


use Illuminate\Console\Command;
use App\Http\Controllers\CoingeckoController;

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
    $this->info('Coingecko Price Updated');
  }
}