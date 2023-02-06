<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
class RolePetugasSeeder extends Seeder
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
            'nama' => 'Petugas Survei',
            'username' => 'survei',
            'email' => 'survei@mail.com',
            'no_hp' => "085236474711",
            'password' => bcrypt('123456')
        ]);

        $role = Role::create(['name' => 'Survei']);

        $permissions = Permission::pluck('id','id')->all();

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);
    }
}
