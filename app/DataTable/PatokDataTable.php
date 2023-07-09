<?php


namespace App\DataTable;

use App\Models\komponen;
use App\Models\Patok;
use Illuminate\Database\Eloquent\Builder;


class PatokDataTable
{

    public function get($input = [])
    {
        $query = Patok::query()->select('patok.*')->with("image", "user")->orderBy('created_at', 'desc');;

        $query->when(isset($input['kategori_id']), function (Builder $q) use ($input) {
            if($input['kategori_id'] == "ideal"){
                $q->where([
                    ['rusak', '=', 'Tidak'],
                    ['hilang', '=', 'Tidak'],
                    ['terhalang', '=', 'Tidak'],
                    ['geser', '=', 'Tidak'],
                ]);

            }else{
                $q->where($input['kategori_id'], 'Ya');
            }

        });

        $query->when(isset($input['status_id']), function (Builder $q) use ($input) {
            $q->where('status', $input['status_id']);
        });

        return $query;


        // $query->when(isset($input['kategori_id']), function (Builder $q) use ($input) {
        //     $q->where('patok.kategori_id', $input['kategori_id']);
        // });

    }
}
