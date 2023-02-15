<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatokTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patok', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('kategori_id');
            $table->unsignedInteger('image_id');
            $table->string('nama');
            $table->string('nilai_km');
            $table->string('nilai_hm');
            $table->string('wilayah');
            $table->string('ruas_jalan');
            $table->string('hilang');
            $table->string('rusak');
            $table->string('terhalang');
            $table->string('geser');
            $table->string('status_geser');
            $table->string('status');
            $table->string('deskripsi');
            $table->string('latlng');
            $table->timestamps();


            $table->foreign('kategori_id')->references('id')->on('kategori')
            ->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('image_id')->references('id')->on('images')
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
        Schema::dropIfExists('patok');
    }
}
