<?php

namespace App\DataTable;

use App\Models\Geografis;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

/**
 * @param  array  $input
 *
 * @return State
 */
class GeografisDataTable
{
    /**
     * @param  array  $input
     *
     * @return MasterTahap1
     */
    public function get($input = [])
    {
        /** @var MasterTahap4 $query */
        // $query = User::query()->select('users.*');
        // $query = Geografis::query()->select('geografis.*');

        $query = Geografis::query()->select('geografis.id', 'geografis.nama', 'geografis.keterangan', 'geografis.tipe', 'geografis.kelompok_data', 'kelompokdata.nama as keldata', 'geografis.nama_tabel')
        ->join('kelompokdata', 'kelompokdata.id', '=', 'geografis.kelompok_data')
        ->get();

        // $query->when(isset($input['unit_opd']), function (Builder $q) use ($input) {
        //     $q->where('roles.id', $input['unit_opd']);
        //     $q->where('roles.id', $input['unit_opd']);
        // });

        return $query;
    }
}
