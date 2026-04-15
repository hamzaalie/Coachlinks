<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // First rename existing Starter to Professional (the $19.99 plan)
        DB::table('plans')
            ->where('name', 'Starter')
            ->where('price', 19.99)
            ->update([
                'name' => 'Professional'
            ]);

        // Then rename Free to Starter and fix pricing ($5/$60)
        DB::table('plans')
            ->where('name', 'Free')
            ->update([
                'name' => 'Starter',
                'price' => 5,
                'yearly_price' => 60
            ]);
    }

    public function down(): void
    {
        // Revert if needed
        DB::table('plans')
            ->where('name', 'Starter')
            ->where('price', 5)
            ->update([
                'name' => 'Free'
            ]);

        DB::table('plans')
            ->where('name', 'Professional')
            ->where('price', 19.99)
            ->update([
                'name' => 'Starter'
            ]);
    }
};
