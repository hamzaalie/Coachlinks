<?php

namespace App\Services;

use App\Models\PlanOrder;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;

class BillingEmailService
{
    public function __construct(private EmailTemplateService $emailTemplateService)
    {
    }

    public function sendPaymentReceipt(User $user, PlanOrder $order): void
    {
        $this->sendTemplate(
            'Payment Receipt',
            $user,
            $this->buildOrderVariables($user, $order)
        );
    }

    public function sendSubscriptionActivated(User $user, PlanOrder $order): void
    {
        $this->sendTemplate(
            'Subscription Activated',
            $user,
            $this->buildOrderVariables($user, $order)
        );
    }

    public function sendSubscriptionRenewalSuccess(User $user, PlanOrder $order): void
    {
        $this->sendTemplate(
            'Subscription Renewal Success',
            $user,
            $this->buildOrderVariables($user, $order)
        );
    }

    public function sendSubscriptionPaymentFailed(User $user, array $variables): void
    {
        $this->sendTemplate('Subscription Payment Failed', $user, $variables);
    }

    public function sendSubscriptionCancelled(User $user, array $variables): void
    {
        $this->sendTemplate('Subscription Cancelled', $user, $variables);
    }

    public function sendTrialExpiringSoon(User $user, int $daysLeft): void
    {
        $this->sendTemplate(
            'Trial Expiring Soon',
            $user,
            [
                '{app_name}' => config('app.name'),
                '{app_url}' => config('app.url'),
                '{user_name}' => $user->name,
                '{user_email}' => $user->email,
                '{days_left}' => (string) $daysLeft,
                '{trial_end_date}' => optional($user->trial_expire_date)?->format('Y-m-d') ?? 'N/A',
            ]
        );
    }

    public function sendTrialExpired(User $user): void
    {
        $this->sendTemplate(
            'Trial Expired',
            $user,
            [
                '{app_name}' => config('app.name'),
                '{app_url}' => config('app.url'),
                '{user_name}' => $user->name,
                '{user_email}' => $user->email,
                '{trial_end_date}' => optional($user->trial_expire_date)?->format('Y-m-d') ?? 'N/A',
            ]
        );
    }

    private function sendTemplate(string $templateName, User $user, array $variables): void
    {
        try {
            $this->emailTemplateService->sendTemplateEmailWithLanguage(
                templateName: $templateName,
                variables: $variables,
                toEmail: $user->email,
                toName: $user->name,
                language: $user->lang ?? 'en'
            );
        } catch (Exception $e) {
            Log::warning('Billing template send skipped/failed', [
                'template' => $templateName,
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    private function buildOrderVariables(User $user, PlanOrder $order): array
    {
        $order->loadMissing('plan');

        return [
            '{app_name}' => config('app.name'),
            '{app_url}' => config('app.url'),
            '{user_name}' => $user->name,
            '{user_email}' => $user->email,
            '{plan_name}' => $order->plan?->name ?? 'N/A',
            '{billing_cycle}' => ucfirst((string) $order->billing_cycle),
            '{amount}' => number_format((float) $order->final_price, 2),
            '{original_amount}' => number_format((float) $order->original_price, 2),
            '{discount_amount}' => number_format((float) $order->discount_amount, 2),
            '{order_number}' => $order->order_number,
            '{payment_method}' => ucfirst((string) $order->payment_method),
            '{payment_id}' => $order->payment_id,
            '{next_renewal_date}' => optional($user->plan_expire_date)?->format('Y-m-d') ?? 'N/A',
            '{paid_at}' => optional($order->ordered_at)?->format('Y-m-d H:i:s') ?? now()->format('Y-m-d H:i:s'),
        ];
    }
}
