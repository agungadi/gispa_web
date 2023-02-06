<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleKepalaUPTSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $user = User::create([
            'nama' => 'Kepala UPT',
            'username' => 'kepala',
            'email' => 'kepalaupt@mail.com',
            'no_hp' => "085236474722",
            'password' => bcrypt('123456')
        ]);

        $role = Role::create(['name' => 'KepalaUPT']);

        $permissions = Permission::pluck('id','id')->all();

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);
    }
}
