<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('assets_market_data', function (Blueprint $table) {
      $table->double('price_change_1h')->nullable();
      $table->double('price_change_7d')->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('assets_market_data', function (Blueprint $table) {
      $table->dropColumn('price_change_1h');
      $table->dropColumn('price_change_7d');
    });
  }
};