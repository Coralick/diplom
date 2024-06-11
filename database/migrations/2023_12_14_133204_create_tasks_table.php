<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('content');
            $table->dateTime('deadline')->nullable();
            $table->unsignedBigInteger('table_id');
            $table->unsignedBigInteger('stage_id');
            $table->timestamps();

            $table->foreign('table_id')->references('id')->on('tables');
            $table->foreign('stage_id')->references('id')->on('stages');

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
