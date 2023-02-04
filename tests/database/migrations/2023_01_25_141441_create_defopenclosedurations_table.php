<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefopenclosedurationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('defopenclosedurations', function (Blueprint $table) {
            $table->integer('ocdId')->primary();
            $table->string('ocdName', 64);
            $table->string('ocdStartTime', 8);
            $table->string('ocdEndTime', 8);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defopenclosedurations');
    }
}
