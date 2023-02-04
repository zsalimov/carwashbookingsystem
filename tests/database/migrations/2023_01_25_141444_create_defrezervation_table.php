<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefrezervationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('defrezervation', function (Blueprint $table) {
            $table->integer('rVehicleId');
            $table->integer('rWasherId');
            $table->dateTime('rStartTime');
            $table->dateTime('rEndTime');
            $table->float('rPrice');
            $table->smallInteger('rCancelled');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defrezervation');
    }
}
