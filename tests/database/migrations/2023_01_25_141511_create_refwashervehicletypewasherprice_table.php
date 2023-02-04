<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefwashervehicletypewasherpriceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refwashervehicletypewasherprice', function (Blueprint $table) {
            $table->integer('wvtwpWasherId');
            $table->integer('wvtwpVehicleTypeId');
            $table->integer('wvtwpWasherTypeId');
            $table->float('wvtwpPrice');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refwashervehicletypewasherprice');
    }
}
