<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Plan;
use App\Models\Business;
use App\Observers\UserObserver;
use App\Observers\PlanObserver;
use App\Observers\BusinessObserver;
use App\Providers\AssetServiceProvider;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(\App\Services\WebhookService::class);
        
        // Register our AssetServiceProvider
        $this->app->register(AssetServiceProvider::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        // Railway sits behind a proxy; force canonical HTTPS URLs in production.
        if (app()->environment('production')) {
            URL::forceScheme('https');

            // Do not force a single root host during web requests.
            // This avoids CSRF/session breakage when the public domain changes.
            if (app()->runningInConsole()) {
                $appUrl = rtrim((string) config('app.url'), '/');
                if (!empty($appUrl)) {
                    URL::forceRootUrl($appUrl);
                }
            }
        }

        // Register the UserObserver
        User::observe(UserObserver::class);
        
        // Register the PlanObserver
        Plan::observe(PlanObserver::class);
        
        // Register the BusinessObserver
        Business::observe(BusinessObserver::class);

        // Configure dynamic storage disks
        $this->app->booted(function () {
            try {
                if (!app()->runningInConsole() && auth()->check()) {
                    \App\Services\DynamicStorageService::configureDynamicDisks();
                }
            } catch (\Exception $e) {
                // Silently fail during migrations or when database is not ready
            }
        });
    }
}