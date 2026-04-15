<?php

namespace App\Observers;

use App\Models\User;
use App\Models\Plan;

class UserObserver
{
    /**
     * Handle the User "creating" event.
     */
    public function creating(User $user): void
    {
        // Plan assignment is handled by RegisteredUserController (auto-trial).
        // No default free plan exists — users without a plan will be prompted to subscribe.
    }
    
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        // Generate a unique referral code if not already set
        if ($user->type === 'company' && empty($user->referral_code)) {
            do {
                $code = rand(100000, 999999);
            } while (User::where('referral_code', $code)->exists());
            
            $user->referral_code = $code;
            $user->save();
        }
        
        // Create default settings for new users
        if ($user->type === 'superadmin') {
            createDefaultSettings($user->id);
        } elseif ($user->type === 'company') {
            copySettingsFromSuperAdmin($user->id);
        }
    }
}