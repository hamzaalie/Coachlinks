<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class FixSessionsAndPermissions extends Command
{
    protected $signature = 'app:fix-sessions-and-permissions';
    protected $description = 'Create sessions table and clear stale session data to fix 419 errors';

    public function handle()
    {
        $this->info('Starting session and permissions repair...');

        // Create sessions table if it doesn't exist
        if (!Schema::hasTable('sessions')) {
            $this->info('Creating sessions table...');
            Schema::create('sessions', function ($table) {
                $table->string('id')->primary();
                $table->foreignId('user_id')->nullable()->index();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->longText('payload');
                $table->integer('last_activity')->index();
            });
            $this->info('✓ Sessions table created');
        } else {
            $this->info('✓ Sessions table already exists');
        }

        // Clear old sessions (older than 24 hours)
        try {
            $cutoff = now()->subHours(24)->timestamp;
            $deleted = DB::table('sessions')
                ->where('last_activity', '<', $cutoff)
                ->delete();
            $this->info("✓ Cleared $deleted stale sessions");
        } catch (\Exception $e) {
            $this->warn("Could not clear stale sessions: " . $e->getMessage());
        }

        // Verify key permissions exist
        $this->info('Verifying critical permissions...');
        try {
            $permissionModel = \Spatie\Permission\Models\Permission::class;
            $permissionClass = app($permissionModel);

            $criticalPermissions = [
                'manage-dashboard' => 'Admin',
                'manage-vcard-builder' => 'Admin',
                'manage-settings' => 'Admin',
                'manage-plans' => 'Admin',
            ];

            foreach ($criticalPermissions as $permission => $guard) {
                if (!$permissionClass::where('name', $permission)->where('guard_name', $guard)->exists()) {
                    $permissionClass::create(['name' => $permission, 'guard_name' => $guard]);
                    $this->info("✓ Created permission: $permission");
                } else {
                    $this->info("✓ Permission exists: $permission");
                }
            }
        } catch (\Exception $e) {
            $this->warn("Could not verify permissions: " . $e->getMessage());
        }

        $this->info('Session and permission repair complete!');
        $this->info('');
        $this->info('Next steps:');
        $this->info('1. Update Railway environment variables with the corrected values');
        $this->info('2. Set SESSION_DRIVER=database');
        $this->info('3. Redeploy');
        $this->info('4. Clear browser cookies and test login again');
    }
}
