<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoachShareTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_id', 'platform', 'title', 'share_text', 'share_image',
        'share_url', 'is_active', 'share_count', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    public function incrementShareCount()
    {
        $this->increment('share_count');
    }
}
