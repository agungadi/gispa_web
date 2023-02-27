<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(RoleAdminSeeder::class);
        $this->call(RoleKepalaUPTSeeder::class);
        $this->call(RolePetugasSeeder::class);
        $this->call(KelompokDataSeeder::class);
        $this->call(PatokDataSeeder::class);
        $this->call(RuasJalanDataSeeder::class);

    }
}
