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
        Schema::create('studio_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Raavan Studio’z');
            $table->string('tagline')->default('Make a count Click the moment');
            $table->string('founder_name')->default('Mr. Gowtham Raj');
            $table->string('founder_experience')->default('8+ Years');
            $table->text('founder_bio')->nullable();
            $table->string('founded_date')->default('21st January 2021');
            $table->string('phone')->default('+91-9500306696');
            $table->string('whatsapp')->default('+91-9500306696');
            $table->string('email')->default('raavanstudioz24@gmail.com');
            $table->string('instagram_main')->default('@raavan_studioz');
            $table->string('instagram_toddlers')->default('@toddlers_by_raavan');
            $table->string('instagram_photobooks')->default('@photobooks_by_raavan');
            $table->json('branches')->nullable();
            $table->json('stats')->nullable();
            $table->text('service_radius_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('studio_profiles');
    }
};
