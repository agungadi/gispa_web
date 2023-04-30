<?php


namespace App\DataTable;

use App\Models\komponen;
use App\Models\Patok;
use Illuminate\Database\Eloquent\Builder;


class ProsesDataTable
{

    public function get($input = [])
    {
        $query = Patok::query()
        ->select('patok.*')
        ->with('image', 'user')
        ->where(function ($q) {
            $q->where('status', 'Laporkan')
              ->orWhere('status', 'Perbaiki')
              ->orWhere('status', 'Ideal')
              ->orWhere('status', 'Selesai');
        });

        $query->when(isset($input['kategori_id']), function (Builder $q) use ($input) {
            $q->where('status', $input['kategori_id']);
        });

        return $query;


        // $query->when(isset($input['kategori_id']), function (Builder $q) use ($input) {
        //     $q->where('patok.kategori_id', $input['kategori_id']);
        // });

    }
}
