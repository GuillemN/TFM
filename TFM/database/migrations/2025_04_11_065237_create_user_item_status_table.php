<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('user_item_status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('item_id');
            $table->string('item_type'); // Ex: 'refugi', 'ruta', 'pic', etc.
            $table->string('status');    // 'wishlist', 'done', etc.
            $table->timestamps();

            // Evitem duplicats exactes
            $table->unique(['user_id', 'item_id', 'item_type', 'status']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('user_item_status');
    }
};