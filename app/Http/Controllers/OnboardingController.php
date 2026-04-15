<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function templateSelection(Request $request): Response
    {
        return Inertia::render('onboarding/template-selection', [
            'selectedTemplate' => session('onboarding_template', 'business-coach'),
            'selectedPlanId' => session('onboarding_plan_id'),
        ]);
    }

    public function saveTemplateSelection(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'template' => ['required', 'string', 'regex:/-coach$/'],
            'plan_id' => 'nullable|integer|exists:plans,id',
        ]);

        session([
            'onboarding_template' => $validated['template'],
            'onboarding_in_progress' => true,
        ]);

        if (!empty($validated['plan_id'])) {
            session(['onboarding_plan_id' => (int) $validated['plan_id']]);
        }

        return redirect()->route('plans.index', [
            'onboarding' => 1,
            'plan_id' => session('onboarding_plan_id'),
        ]);
    }
}
