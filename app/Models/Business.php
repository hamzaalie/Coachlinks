<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Business extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'slug',
        'business_type',
        'config_sections',
        'created_by',
        'custom_domain',
        'url_prefix',
        'password',
        'password_enabled',
        'domain_type',
        'view_count',
        'favicon',
        // Coaching identity
        'niche',
        'target_audience',
        'coaching_style',
        'years_experience',
        'clients_transformed',
        'certifications',
        // Signature offer
        'signature_offer_title',
        'signature_offer_description',
        'signature_offer_price',
        'signature_offer_currency',
        'signature_offer_url',
        // Lead magnet
        'lead_magnet_title',
        'lead_magnet_url',
        'lead_magnet_type',
        // Booking & scheduling
        'booking_url',
        'booking_provider',
        'client_portal_url',
        // Extra channels
        'youtube_url',
        'podcast_url',
        'course_platform_url',
        'whatsapp_number',
        'whatsapp_message',
        // Visual & payment
        'results_gallery',
        'stripe_payment_link',
        'paypal_payment_link',
        // Analytics
        'booking_clicks',
        'lead_magnet_downloads',
        'offer_clicks',
    ];

    protected $casts = [
        'config_sections' => 'array',
        'password_enabled' => 'boolean',
        'niche' => 'array',
        'certifications' => 'array',
        'results_gallery' => 'array',
    ];
    
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($business) {
            if (empty($business->slug)) {
                $business->slug = static::generateUniqueSlug($business->name);
            }
        });
        
        static::updating(function ($business) {
            if ($business->isDirty('name') && empty($business->slug)) {
                $business->slug = static::generateUniqueSlug($business->name);
            }
        });
    }
    
    public static function generateUniqueSlug($name, $excludeId = null, $urlPrefix = 'v')
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $counter = 1;
        
        $query = static::where('slug', $slug)->where('url_prefix', $urlPrefix);
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }
        
        while ($query->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
            $query = static::where('slug', $slug)->where('url_prefix', $urlPrefix);
            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }
        }
        
        return $slug;
    }
    
    /**
     * Get the user that owns the business.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    
    /**
     * Get the contacts for the business.
     */
    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
    
    /**
     * Get the appointments for the business.
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
    
    /**
     * Get the campaigns for the business.
     */
    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }
    
    /**
     * Get active campaigns for the business.
     */
    public function activeCampaigns()
    {
        return $this->hasMany(Campaign::class)->activeCampaigns();
    }

    // ── Coaching Relationships ─────────────────────────────────

    /**
     * Get the coaching programs for the business.
     */
    public function coachPrograms()
    {
        return $this->hasMany(CoachProgram::class);
    }

    /**
     * Get the coaching testimonials for the business.
     */
    public function coachTestimonials()
    {
        return $this->hasMany(CoachTestimonial::class);
    }

    /**
     * Get the coaching leads for the business.
     */
    public function coachLeads()
    {
        return $this->hasMany(CoachLead::class);
    }

    /**
     * Get the coaching bookings for the business.
     */
    public function coachBookings()
    {
        return $this->hasMany(CoachBooking::class);
    }

    /**
     * Get the share templates for the business.
     */
    public function coachShareTemplates()
    {
        return $this->hasMany(CoachShareTemplate::class);
    }
}