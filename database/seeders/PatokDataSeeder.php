<?php

namespace Database\Seeders;

use App\Models\Images;
use App\Models\Kategori;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\KelompokData;
use App\Models\Patok;

class PatokDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $kategori = file_get_contents(storage_path('json/kategori.json'));
        $kategori = json_decode($kategori, true)['data'];
        Kategori::insert($kategori);

        $images = file_get_contents(storage_path('json/image.json'));
        $images = json_decode($images, true)['data'];
        Images::insert($images);

        $patok = file_get_contents(storage_path('json/patok.json'));
        $patok = json_decode($patok, true)['data'];
        Patok::insert($patok);

    }
}
