<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefstorefeedbackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('defstorefeedback', function (Blueprint $table) {
            $table->integer('sfUserId');
            $table->integer('sfStoreId');
            $table->text('sfContent');
            $table->integer('sfStars');
            $table->timestamp('sfTime')->default('current_timestamp()');
            $table->string('sfIp', 16);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defstorefeedback');
    }
}
