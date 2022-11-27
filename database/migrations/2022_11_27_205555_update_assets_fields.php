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
    Schema::table('assets', function (Blueprint $table) {
      $table->renameColumn('coingecko_id', 'provider_id');
      $table->string('provider');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('assets', function (Blueprint $table) {
      $table->renameColumn('provider_id', 'coingecko_id');
      $table->dropColumn('provider');
    });
  }
};