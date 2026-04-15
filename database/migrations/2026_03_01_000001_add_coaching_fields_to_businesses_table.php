<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Adds coaching-specific fields to the businesses table for CoachLinks.
     */
    public function up(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            // Coaching niche & identity
            $table->json('niche')->nullable()->after('business_type')
                ->comment('Multi-select coaching niches: life, business, fitness, executive, health, mindset, relationship, career, spiritual, money');
            $table->string('target_audience', 500)->nullable()->after('niche')
                ->comment('Who the coach helps: e.g. "Ambitious women 30-45 who want to launch their business"');
            $table->string('coaching_style', 100)->nullable()->after('target_audience')
                ->comment('1-on-1, group, hybrid, courses, retreats');
            
            // Signature offer
            $table->string('signature_offer_title', 300)->nullable()->after('coaching_style');
            $table->text('signature_offer_description')->nullable()->after('signature_offer_title');
            $table->decimal('signature_offer_price', 10, 2)->nullable()->after('signature_offer_description');
            $table->string('signature_offer_currency', 10)->default('USD')->after('signature_offer_price');
            $table->string('signature_offer_url')->nullable()->after('signature_offer_currency')
                ->comment('Payment/enrollment link for the signature offer');
            
            // Credibility & social proof
            $table->unsignedInteger('years_experience')->nullable()->after('signature_offer_url');
            $table->unsignedInteger('clients_transformed')->nullable()->after('years_experience')
                ->comment('Number of clients helped/transformed');
            $table->json('certifications')->nullable()->after('clients_transformed')
                ->comment('Array of certification objects: {name, issuer, year}');
            
            // Lead generation
            $table->string('lead_magnet_title')->nullable()->after('certifications');
            $table->string('lead_magnet_url')->nullable()->after('lead_magnet_title')
                ->comment('URL to free resource / lead magnet download');
            $table->string('lead_magnet_type', 50)->nullable()->after('lead_magnet_url')
                ->comment('ebook, checklist, webinar, mini-course, quiz, template, video-series');
            
            // Booking & client management
            $table->string('booking_url')->nullable()->after('lead_magnet_type')
                ->comment('Calendly, Cal.com, or native booking link');
            $table->string('booking_provider', 50)->nullable()->after('booking_url')
                ->comment('calendly, calcom, native, acuity, tidycal');
            $table->string('client_portal_url')->nullable()->after('booking_provider')
                ->comment('Private portal link for existing clients');
            
            // Content & media
            $table->string('youtube_url')->nullable()->after('client_portal_url');
            $table->string('podcast_url')->nullable()->after('youtube_url');
            $table->string('course_platform_url')->nullable()->after('podcast_url')
                ->comment('Link to Teachable, Kajabi, Thinkific, etc.');
            $table->json('results_gallery')->nullable()->after('course_platform_url')
                ->comment('Array of before/after transformation objects');
            
            // Payment links
            $table->string('stripe_payment_link')->nullable()->after('results_gallery');
            $table->string('paypal_payment_link')->nullable()->after('stripe_payment_link');
            $table->string('whatsapp_number')->nullable()->after('paypal_payment_link');
            $table->string('whatsapp_message', 500)->nullable()->after('whatsapp_number')
                ->comment('Pre-filled WhatsApp message for booking');
            
            // Coaching-specific analytics
            $table->unsignedInteger('booking_clicks')->default(0)->after('whatsapp_message');
            $table->unsignedInteger('lead_magnet_downloads')->default(0)->after('booking_clicks');
            $table->unsignedInteger('offer_clicks')->default(0)->after('lead_magnet_downloads');
            
            // Index for filtering coaches by niche
            $table->index('years_experience');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn([
                'niche', 'target_audience', 'coaching_style',
                'signature_offer_title', 'signature_offer_description', 
                'signature_offer_price', 'signature_offer_currency', 'signature_offer_url',
                'years_experience', 'clients_transformed', 'certifications',
                'lead_magnet_title', 'lead_magnet_url', 'lead_magnet_type',
                'booking_url', 'booking_provider', 'client_portal_url',
                'youtube_url', 'podcast_url', 'course_platform_url', 'results_gallery',
                'stripe_payment_link', 'paypal_payment_link',
                'whatsapp_number', 'whatsapp_message',
                'booking_clicks', 'lead_magnet_downloads', 'offer_clicks',
            ]);
        });
    }
};
