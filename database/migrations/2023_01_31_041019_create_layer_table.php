<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLayerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('layer', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('geografis_id');
            $table->string('nama');
            $table->string('warna');
            $table->string('warna_border');
            $table->string('tebal_border');
            $table->string('opacity');
            $table->timestamps();


            $table->foreign('geografis_id')->references('id')->on('geografis')
            ->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('layer');
    }
}
