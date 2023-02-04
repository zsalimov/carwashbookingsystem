<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefwasherTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('defwasher', function (Blueprint $table) {
            $table->integer('wId')->primary();
            $table->integer('wStoreId');
            $table->string('wName', 120);
            $table->integer('wOpenClosePatternId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defwasher');
    }
}
