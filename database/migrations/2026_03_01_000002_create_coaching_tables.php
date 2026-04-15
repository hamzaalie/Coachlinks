<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Creates coaching-specific related tables for CoachLinks.
     */
    public function up(): void
    {
        // Coach programs / courses / offerings
        Schema::create('coach_programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('format', 50)->default('one-on-one')
                ->comment('one-on-one, group, workshop, online-course, retreat, membership, vip-day');
            $table->decimal('price', 10, 2)->nullable();
            $table->string('currency', 10)->default('USD');
            $table->string('price_label', 100)->nullable()
                ->comment('Custom label like "Starting at", "From", "Investment"');
            $table->string('duration')->nullable()
                ->comment('e.g. "12 weeks", "3 months", "6 sessions"');
            $table->json('bullet_points')->nullable()
                ->comment('Array of what is included');
            $table->string('enrollment_url')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->unsignedInteger('click_count')->default(0);
            $table->timestamps();
        });

        // Client testimonials with rich data
        Schema::create('coach_testimonials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->string('client_name');
            $table->string('client_photo')->nullable();
            $table->string('client_title')->nullable()
                ->comment('e.g. "CEO, Tech Startup" or "Life Coach"');
            $table->text('quote');
            $table->string('result_achieved')->nullable()
                ->comment('One-liner: "Lost 30lbs in 90 days" or "Grew revenue 5x"');
            $table->unsignedTinyInteger('rating')->default(5)
                ->comment('1-5 star rating');
            $table->string('before_image')->nullable();
            $table->string('after_image')->nullable();
            $table->string('video_url')->nullable()
                ->comment('Video testimonial URL');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        // Lead capture form submissions
        Schema::create('coach_leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('source', 50)->default('website')
                ->comment('website, lead-magnet, discovery-call, whatsapp, referral');
            $table->text('biggest_challenge')->nullable()
                ->comment('Answer to "What is your biggest challenge right now?"');
            $table->text('goals')->nullable()
                ->comment('Answer to "What do you want to achieve?"');
            $table->json('custom_answers')->nullable()
                ->comment('Answers to custom coach questions');
            $table->string('status', 30)->default('new')
                ->comment('new, contacted, qualified, booked, converted, lost');
            $table->text('notes')->nullable();
            $table->timestamp('last_contacted_at')->nullable();
            $table->timestamps();

            $table->index(['business_id', 'status']);
            $table->index(['business_id', 'created_at']);
        });

        // Discovery call bookings (native, non-Calendly)
        Schema::create('coach_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lead_id')->nullable()->constrained('coach_leads')->nullOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('call_type', 50)->default('discovery')
                ->comment('discovery, strategy, consultation, follow-up');
            $table->date('booking_date');
            $table->time('booking_time');
            $table->unsignedInteger('duration_minutes')->default(30);
            $table->text('pre_call_notes')->nullable()
                ->comment('What the client wants to discuss');
            $table->string('meeting_link')->nullable()
                ->comment('Zoom/Google Meet link');
            $table->string('status', 30)->default('pending')
                ->comment('pending, confirmed, completed, cancelled, no-show');
            $table->text('post_call_notes')->nullable();
            $table->timestamps();

            $table->index(['business_id', 'booking_date']);
        });

        // Viral share templates
        Schema::create('coach_share_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->string('platform', 50)
                ->comment('instagram-story, tiktok, linkedin, whatsapp, twitter, email');
            $table->string('title');
            $table->text('share_text');
            $table->string('share_image')->nullable();
            $table->string('share_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('share_count')->default(0);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coach_share_templates');
        Schema::dropIfExists('coach_bookings');
        Schema::dropIfExists('coach_leads');
        Schema::dropIfExists('coach_testimonials');
        Schema::dropIfExists('coach_programs');
    }
};
