<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefwasherpromotionhourTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refwasherpromotionhour', function (Blueprint $table) {
            $table->integer('wphWasherId');
            $table->integer('wphStartHour');
            $table->integer('wphEndHour');
            $table->integer('wphPromotion');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refwasherpromotionhour');
    }
}
