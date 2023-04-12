<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Grammars\PostgresGrammar;

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
            $table->unsignedInteger('id_user');
            $table->unsignedInteger('update_id_user')->nullable();
            $table->string('nama');
            $table->integer('nilai_km');
            $table->integer('nilai_hm');
            $table->string('wilayah');
            $table->string('ruas_jalan');
            $table->string('hilang');
            $table->string('rusak');
            $table->string('terhalang');
            $table->string('geser')->nullable();;
            $table->string('status_geser')->nullable();
            $table->string('status');
            $table->string('deskripsi')->nullable();
            $table->string('latlng');
            $table->string('longlat')->nullable();
            $table->point('p_longlat')->nullable();
            $table->string('periode')->nullable();;
            $table->timestamps();


            $table->foreign('kategori_id')->references('id')->on('kategori')
            ->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('image_id')->references('id')->on('images')
            ->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_user')->references('id')->on('users')
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
