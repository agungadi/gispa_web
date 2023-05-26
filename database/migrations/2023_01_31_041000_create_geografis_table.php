<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeografisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('geografis', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('keterangan');
            $table->string('tipe');
            $table->unsignedBigInteger('kelompok_data');
            $table->string('nama_tabel');
            $table->string('field1')->nullable();
            $table->string('field2')->nullable();
            $table->string('field3')->nullable();
            $table->string('field4')->nullable();
            $table->string('field5')->nullable();
            $table->string('field6')->nullable();
            $table->string('field7')->nullable();
            $table->string('field8')->nullable();
            $table->timestamps();

            $table->foreign('kelompok_data')->references('id')->on('kelompokdata')
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
        Schema::dropIfExists('geografis');
    }
}
