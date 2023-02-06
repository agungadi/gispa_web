<?php

namespace App\DataTable;

use App\Models\Layer;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

/**
 * @param  array  $input
 *
 * @return State
 */
class LayerDataTable
{
    /**
     * @param  array  $input
     *
     * @return MasterTahap1
     */
    public function get($input = [])
    {
        /** @var MasterTahap4 $query */
        // $query = Layer::query()->select('layer.*');

        $query = Layer::query()->select('layer.id', 'layer.nama', 'geografis.tipe as tipe', 'geografis.nama as namageo', 'layer.warna', 'layer.warna_border', 'layer.tebal_border', 'layer.opacity')
        ->join('geografis', 'geografis.id', '=', 'layer.geografis_id')
        ->get();

        // $query->when(isset($input['unit_opd']), function (Builder $q) use ($input) {
        //     $q->where('roles.id', $input['unit_opd']);
        //     $q->where('roles.id', $input['unit_opd']);
        // });

        return $query;
    }
}
