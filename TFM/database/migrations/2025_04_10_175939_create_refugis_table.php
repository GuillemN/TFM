<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('refugis', function (Blueprint $table) {
            $table->id('id_refugi');
            $table->string('nom');
            $table->string('coordenades');
            $table->integer('capacitat');
            $table->string('contacte');
            $table->string('imatge')->nullable(); // nom del fitxer d'imatge
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refugis');
    }
};
