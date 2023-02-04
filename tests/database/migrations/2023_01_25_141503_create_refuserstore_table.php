<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefuserstoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refuserstore', function (Blueprint $table) {
            $table->integer('usStoreId');
            $table->integer('usUserId');
            
            $table->unique(['usStoreId', 'usUserId'], 'usStoreId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refuserstore');
    }
}
