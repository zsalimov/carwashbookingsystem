<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefwashervehicletypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refwashervehicletype', function (Blueprint $table) {
            $table->integer('wvWasherId');
            $table->integer('wvVehicleTypeId');
            $table->integer('wvDurationMin');
            
            $table->unique(['wvWasherId', 'wvVehicleTypeId'], 'wvWasherId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refwashervehicletype');
    }
}
