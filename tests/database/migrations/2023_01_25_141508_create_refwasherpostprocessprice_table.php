<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefwasherpostprocesspriceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refwasherpostprocessprice', function (Blueprint $table) {
            $table->integer('wppWasherId');
            $table->integer('wppPostProcessId');
            $table->float('wppPrice');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refwasherpostprocessprice');
    }
}
