<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoachBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_id', 'lead_id', 'name', 'email', 'phone', 'call_type',
        'booking_date', 'booking_time', 'duration_minutes', 'pre_call_notes',
        'meeting_link', 'status', 'post_call_notes',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'booking_time' => 'datetime:H:i',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function lead()
    {
        return $this->belongsTo(CoachLead::class, 'lead_id');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeUpcoming($query)
    {
        return $query->where('booking_date', '>=', now()->toDateString())
                     ->where('status', '!=', 'cancelled');
    }
}
