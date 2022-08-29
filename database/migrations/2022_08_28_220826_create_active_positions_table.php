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
        Schema::create('active_positions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('buy_asset_id');
            $table->double('buy_amount');

            $table->unsignedBigInteger('sell_asset_id');
            $table->double('sell_amount');

            $table->bigInteger('close_amount')->nullable();

            $table->unsignedBigInteger('user_id');

            $table->timestamps();

            $table->foreign('buy_asset_id')->references('id')->on('assets')->onDelete('cascade');
            $table->foreign('sell_asset_id')->references('id')->on('assets')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('active_positions', function (Blueprint $table) {
            $table->dropForeign(['buy_asset_id']);
            $table->dropColumn('buy_asset_id');

            $table->dropForeign(['sell_asset_id']);
            $table->dropColumn('sell_asset_id');

            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });

        Schema::dropIfExists('active_positions');
    }
};