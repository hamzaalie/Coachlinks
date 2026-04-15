<?php

namespace App\Console\Commands;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Console\Command;

class AssignDefaultPlanToUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:assign-trial-plan';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign 7-day trial on the Starter Coach plan to company users without a plan';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $trialPlan = Plan::where('is_plan_enable', 'on')
            ->where('is_trial', 'on')
            ->orderBy('price', 'asc')
            ->first();

        if (!$trialPlan) {
            $this->error(__('No trial-enabled plan found. Please enable trial on at least one plan.'));
            return 1;
        }

        $users = User::where('type', 'company')
            ->whereNull('plan_id')
            ->get();

        $count = 0;
        foreach ($users as $user) {
            $user->update([
                'plan_id' => $trialPlan->id,
                'is_trial' => 1,
                'trial_day' => $trialPlan->trial_day,
                'trial_expire_date' => now()->addDays($trialPlan->trial_day),
                'plan_expire_date' => now()->addDays($trialPlan->trial_day),
                'plan_is_active' => 1,
            ]);
            $count++;
        }

        $this->info("Successfully assigned {$trialPlan->trial_day}-day trial ({$trialPlan->name}) to {$count} users.");

        return 0;
    }
}