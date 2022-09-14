<?php

namespace App\Console\Commands;


use Illuminate\Console\Command;
use App\Http\Controllers\Api\AssetsController;

class UpdatePrice extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'update:price';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Fetch current price of all assets';

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
    $assets = new AssetsController();
    $assets->updateCoingeckoPrices();
    $this->info('Price Updated');
  }
}