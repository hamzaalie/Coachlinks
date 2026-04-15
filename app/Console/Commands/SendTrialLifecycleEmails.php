<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\BillingEmailService;
use Illuminate\Console\Command;

class SendTrialLifecycleEmails extends Command
{
    protected $signature = 'emails:send-trial-lifecycle';

    protected $description = 'Send trial expiring and trial expired email templates';

    public function handle(BillingEmailService $billingEmailService): int
    {
        $users = User::where('is_trial', 1)
            ->whereNotNull('trial_expire_date')
            ->get();

        $sentCount = 0;

        foreach ($users as $user) {
            $daysLeft = (int) now()->startOfDay()->diffInDays($user->trial_expire_date->startOfDay(), false);

            if (in_array($daysLeft, [3, 1], true)) {
                $cacheKey = "trial_expiring_email_sent_{$user->id}_{$daysLeft}_" . now()->format('Y-m-d');

                if (cache()->add($cacheKey, true, now()->endOfDay())) {
                    $billingEmailService->sendTrialExpiringSoon($user, $daysLeft);
                    $sentCount++;
                }
            }

            if ($daysLeft < 0) {
                $cacheKey = "trial_expired_email_sent_{$user->id}_" . now()->format('Y-m-d');

                if (cache()->add($cacheKey, true, now()->endOfDay())) {
                    $billingEmailService->sendTrialExpired($user);
                    $sentCount++;
                }
            }
        }

        $this->info("Trial lifecycle emails processed. Sent: {$sentCount}");

        return self::SUCCESS;
    }
}
