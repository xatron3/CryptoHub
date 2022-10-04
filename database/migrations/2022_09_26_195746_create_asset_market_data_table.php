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
        Schema::create('assets_market_data', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('asset_id');

            $table->double('current_price')->nullable();
            $table->bigInteger('market_cap')->nullable();
            $table->double('price_change_24h')->nullable();

            $table->foreign('asset_id')->references('id')->on('assets')->onDelete('cascade');
            $table->timestamps();
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
            $table->dropForeign(['asset_id']);
            $table->dropColumn('asset_id');
        });

        Schema::dropIfExists('assets_market_data');
    }
};