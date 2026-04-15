<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoachProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_id', 'title', 'description', 'format', 'price', 'currency',
        'price_label', 'duration', 'bullet_points', 'enrollment_url', 'image',
        'is_featured', 'is_active', 'sort_order', 'click_count',
    ];

    protected $casts = [
        'bullet_points' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    public function getFormattedPriceAttribute(): string
    {
        if (!$this->price) return 'Contact for pricing';
        $label = $this->price_label ?? '';
        return trim("{$label} {$this->currency} " . number_format($this->price, 2));
    }
}
