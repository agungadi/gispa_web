<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\KelompokData;

class KelompokDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $keldata = file_get_contents(storage_path('json/keldata.json'));
        $keldata = json_decode($keldata, true)['data'];
        KelompokData::insert($keldata);
    }
}
