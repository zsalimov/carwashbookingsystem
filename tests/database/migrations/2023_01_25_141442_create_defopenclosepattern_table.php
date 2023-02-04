<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefopenclosepatternTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('defopenclosepattern', function (Blueprint $table) {
            $table->integer('ocpId')->primary();
            $table->string('ocpName', 32);
            $table->integer('ocpDay1');
            $table->integer('ocpDay2');
            $table->integer('ocpDay3');
            $table->integer('ocpDay4');
            $table->integer('ocpDay5');
            $table->integer('ocpDay6');
            $table->integer('ocpDay7');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defopenclosepattern');
    }
}
