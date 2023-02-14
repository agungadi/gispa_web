<?php

namespace App\DataTable;

use App\Models\Patok;
use Illuminate\Database\Eloquent\Builder;

/**
 * @param  array  $input
 *
 * @return State
 */
class PatokDataTable
{
    /**
     * @param  array  $input
     *
     * @return MasterTahap1
     */
    public function get($input = [])
    {
        /** @var MasterTahap4 $query */
        $query = Patok::query()->select('patok.*');

        // $query = Layer::query()->select('layer.id', 'layer.nama', 'geografis.tipe as tipe', 'geografis.nama as namageo', 'layer.warna', 'layer.warna_border', 'layer.tebal_border', 'layer.opacity')
        // ->join('geografis', 'geografis.id', '=', 'layer.geografis_id')
        // ->get();

        $query->when(isset($input['id_kategori']), function (Builder $q) use ($input) {
            $q->where('patok.kategori_id', $input['id_kategori']);
        });

        return $query;
    }
}
