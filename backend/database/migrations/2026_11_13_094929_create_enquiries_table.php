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
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('general'); // wedding_event, newborn_toddler, general
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone');
            $table->string('event_type')->nullable();
            $table->string('event_date')->nullable();
            $table->string('location')->nullable();
            $table->string('parent_name')->nullable();
            $table->string('baby_name')->nullable();
            $table->string('baby_age')->nullable();
            $table->string('baby_weight')->nullable();
            $table->string('baby_gender')->nullable();
            $table->string('preferred_slot')->nullable();
            $table->string('selected_package')->nullable();
            $table->text('message')->nullable();
            $table->string('status')->default('new'); // new, contacted, booked, cancelled
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
