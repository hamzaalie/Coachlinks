<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $cappedExpiry = now()->startOfDay()->addDays(7)->toDateString();

        // Ensure all trial-enabled plans consistently use 7 trial days.
        DB::table('plans')
            ->where('is_trial', 'on')
            ->update(['trial_day' => 7]);

        // Keep user trial_day aligned with the 7-day policy.
        DB::table('users')
            ->where('is_trial', 1)
            ->update(['trial_day' => 7]);

        // Cap active trial expiry to a maximum of 7 days from today.
        DB::table('users')
            ->where('is_trial', 1)
            ->whereDate('trial_expire_date', '>', $cappedExpiry)
            ->update([
                'trial_expire_date' => $cappedExpiry,
                'plan_expire_date' => $cappedExpiry,
            ]);
    }

    public function down(): void
    {
        // No safe down migration because previous trial values vary by user and plan.
    }
};
