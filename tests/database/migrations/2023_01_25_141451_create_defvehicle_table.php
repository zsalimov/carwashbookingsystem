<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefvehicleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('defvehicle', function (Blueprint $table) {
            $table->integer('vId')->primary();
            $table->string('vPlateNumber', 64);
            $table->integer('vVehicleTypeId');
            $table->integer('vUserId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defvehicle');
    }
}
