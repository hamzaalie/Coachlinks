<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Update Free plan price to 0
        DB::table('plans')
            ->where('name', 'Free')
            ->update([
                'price' => 0,
                'yearly_price' => 0
            ]);
    }

    public function down(): void
    {
        // Revert if needed
        DB::table('plans')
            ->where('name', 'Free')
            ->update([
                'price' => 5,
                'yearly_price' => 60
            ]);
    }
};
