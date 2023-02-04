<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefuserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('defuser', function (Blueprint $table) {
            $table->integer('uId')->primary();
            $table->integer('uUserTypeId');
            $table->string('uName', 80);
            $table->string('uAddress', 120);
            $table->string('uPhone', 30);
            $table->string('uEmail', 45);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defuser');
    }
}
