<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Update titleText setting to CoachLinks
        DB::table('settings')
            ->where('key', 'titleText')
            ->update(['value' => 'CoachLinks']);
            
        // Update footerText setting to CoachLinks
        DB::table('settings')
            ->where('key', 'footerText')
            ->update(['value' => '© 2026 CoachLinks. All rights reserved.']);
    }

    public function down(): void
    {
        // Revert if needed
        DB::table('settings')
            ->where('key', 'titleText')
            ->delete();
            
        DB::table('settings')
            ->where('key', 'footerText')
            ->delete();
    }
};
