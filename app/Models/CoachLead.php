<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoachLead extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_id', 'name', 'email', 'phone', 'source',
        'biggest_challenge', 'goals', 'custom_answers', 'status',
        'notes', 'last_contacted_at',
    ];

    protected $casts = [
        'custom_answers' => 'array',
        'last_contacted_at' => 'datetime',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function bookings()
    {
        return $this->hasMany(CoachBooking::class, 'lead_id');
    }

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    public function scopeQualified($query)
    {
        return $query->where('status', 'qualified');
    }

    public function scopeConverted($query)
    {
        return $query->where('status', 'converted');
    }
}
