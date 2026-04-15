<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Plan;
use App\Models\Business;
use App\Models\Referral;
use App\Models\ReferralSetting;
use App\Services\DomainValidationService;
use App\Services\UserService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(Request $request): Response
    {
        $referralCode = $request->get('ref');
        $encryptedPlanId = $request->get('plan');
        $planId = null;
        $referrer = null;
        
        // Decrypt and validate plan ID
        if ($encryptedPlanId) {
            $planId = $this->decryptPlanId($encryptedPlanId);
            if ($planId && !Plan::find($planId)) {
                $planId = null; // Invalid plan ID
            }
        }
        
        if ($referralCode) {
            $referrer = User::where('referral_code', $referralCode)
                ->where('type', 'company')
                ->first();
        }
        
        return Inertia::render('auth/register', [
            'referralCode' => $referralCode,
            'planId' => $planId,
            'referrer' => $referrer ? $referrer->name : null,
            'settings' => settings(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'plan_id' => 'nullable|integer|exists:plans,id',
        ]);

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => 'company',
            'is_active' => 1,
            'is_enable_login' => 1,
            'created_by' => 0,
            'plan_is_active' => 0,
        ];

        // Trial auto-assignment is intentionally disabled.
        // Keep this commented block for future reactivation if needed.
        // $trialPlan = Plan::where('is_plan_enable', 'on')
        //     ->where('is_trial', 'on')
        //     ->orderBy('price', 'asc')
        //     ->first();
        //
        // if ($trialPlan) {
        //     $userData['plan_id'] = $trialPlan->id;
        //     $userData['is_trial'] = 1;
        //     $userData['trial_day'] = $trialPlan->trial_day ?? 7;
        //     $userData['trial_expire_date'] = now()->addDays($trialPlan->trial_day ?? 7);
        //     $userData['plan_expire_date'] = now()->addDays($trialPlan->trial_day ?? 7);
        // }
        
        // Handle referral code
        if ($request->referral_code) {
            $referrer = User::where('referral_code', $request->referral_code)
                ->where('type', 'company')
                ->first();
            
            if ($referrer) {
                $userData['used_referral_code'] = $request->referral_code;
            }
        }
        
        $user = User::create($userData);

        // Assign role and settings to the user
        defaultRoleAndSetting($user);
        
        // Note: Referral record will be created when user purchases a plan
        // This is handled in the PlanController or payment controllers

        Auth::login($user);

        if ($request->filled('plan_id')) {
            session(['onboarding_plan_id' => (int) $request->plan_id]);
        }
        session(['onboarding_in_progress' => true]);

        // Auto-create default card is intentionally disabled for onboarding-first flow.
        // Keep this for future reactivation.
        // $business = $this->createDefaultCoachCard($user);

        // Check if email verification is enabled
        $emailVerificationEnabled = getSetting('emailVerification', false);
        if ($emailVerificationEnabled) {
            // Send verification email manually to avoid duplicate emails
            $user->sendEmailVerificationNotification();
            return redirect()->route('verification.notice');
        }

        // Redirect to template gallery to select a coach card template
        return redirect()->route('vcard-builder.templates');
    }
    
    /**
     * Create a default Business Coach card for a newly registered user.
     */
    private function createDefaultCoachCard(User $user): ?Business
    {
        try {
            $name = $user->name;
            $slug = DomainValidationService::generateUniqueSlug($name, 'v');

            $defaultSections = [
                'header' => [
                    'name'    => $name,
                    'title'   => 'Business Growth Coach',
                    'tagline' => 'Helping entrepreneurs reach their full potential',
                ],
                'contact' => [
                    'email'    => $user->email,
                    'phone'    => '',
                    'website'  => '',
                    'location' => '',
                ],
                'about' => [
                    'description'    => '',
                    'specializations' => ['Business Strategy', 'Growth', 'Leadership'],
                    'experience'     => 0,
                    'mission'        => '',
                ],
                'booking' => [
                    'call_duration'    => '30 minutes',
                    'call_description' => 'Book a free discovery call to learn how I can help you grow.',
                ],
                'links' => [
                    'link_items' => [],
                ],
                'seo' => [
                    'meta_title'       => $name . ' | Coach',
                    'meta_description' => 'Connect with ' . $name . ' — Book a call, explore coaching programs, and more.',
                ],
                'footer' => [
                    'footer_text'    => 'Ready to grow?',
                    'copyright_text' => '© ' . date('Y') . ' ' . $name . '. All rights reserved.',
                ],
                'colors' => [
                    'primary'   => '#0A2540',
                    'secondary' => '#6B4EFF',
                    'accent'    => '#FF6B00',
                    'text'      => '#1a1a2e',
                ],
            ];

            return Business::create([
                'name'             => $name,
                'slug'             => $slug,
                'business_type'    => 'business-coach',
                'config_sections'  => $defaultSections,
                'url_prefix'       => 'v',
                'password_enabled' => false,
                'domain_type'      => 'slug',
                'created_by'       => $user->id,
            ]);
        } catch (\Exception $e) {
            \Log::warning('Auto-create coach card failed for user ' . $user->id . ': ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Decrypt plan ID from encrypted string
     */
    private function decryptPlanId($encryptedPlanId)
    {
        try {
            $key = 'vCard2025';
            $encrypted = base64_decode($encryptedPlanId);
            $decrypted = '';
            
            for ($i = 0; $i < strlen($encrypted); $i++) {
                $decrypted .= chr(ord($encrypted[$i]) ^ ord($key[$i % strlen($key)]));
            }
            
            return is_numeric($decrypted) ? (int)$decrypted : null;
        } catch (\Exception $e) {
            return null;
        }
    }
    
    /**
     * Create referral record when user purchases a plan
     */
    private function createReferralRecord(User $user)
    {
        $settings = ReferralSetting::current();
        
        if (!$settings->is_enabled) {
            return;
        }
        
        $referrer = User::where('referral_code', $user->used_referral_code)->first();
        if (!$referrer || !$user->plan) {
            return;
        }
        
        // Calculate commission based on plan price
        $planPrice = $user->plan->price ?? 0;
        $commissionAmount = ($planPrice * $settings->commission_percentage) / 100;
        
        if ($commissionAmount > 0) {
            Referral::create([
                'user_id' => $user->id,
                'company_id' => $referrer->id,
                'commission_percentage' => $settings->commission_percentage,
                'amount' => $commissionAmount,
                'plan_id' => $user->plan_id,
            ]);
        }
    }
}
