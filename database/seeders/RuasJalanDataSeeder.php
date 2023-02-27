<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\KelompokData;
use App\Models\RuasJalan;

class RuasJalanDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $jalan = file_get_contents(storage_path('json/ruasjalan.json'));
        $jalan = json_decode($jalan, true)['data'];
        RuasJalan::insert($jalan);
    }
}
