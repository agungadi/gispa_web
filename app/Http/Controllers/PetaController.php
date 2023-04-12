<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use DB;
use App\Models\Patok;

class PetaController extends AppBaseController
{
    //

    public function index(Request $request)
    {
        $kuarter = Patok::select([
            'periode'
        ])
        ->groupBy('periode')
        ->orderBy('periode', 'asc')
        ->pluck('periode');
        //
        // $keldata = Geografis::pluck('nama', 'id');


        // if ($request->ajax()) {
        //     return DataTables::of((new LayerDataTable())->get($request->only(['kel_data'])))->make(true);
        // }



        return view('peta.tampil_peta', compact('kuarter'));

    }


    public function get_layer(Request $request){

        $nama_tabel = $request->nama_tabel;

        $data= DB::table($nama_tabel)->get();

        return $this->sendResponse($data, 'Data Geografis successfully retrieved.');


    }

    public function get_patok(Request $request){

        $rusak = $request->rusak;
        $hilang = $request->hilang;
        $terhalang = $request->terhalang;
        $geser = $request->geser;
        $ideal = $request->ideal;
        $kuartal = $request->kuartal;


        $patok = Patok::query()->select('patok.*');


        if(!empty($rusak)){
            $patok = $patok->where(DB::raw('lower(patok.rusak)'), strtolower($rusak));
        }
        if(!empty($hilang)){
            $patok = $patok->where(DB::raw('lower(patok.hilang)'), strtolower($hilang));

        }
        if(!empty($terhalang)){
            $patok = $patok->where(DB::raw('lower(patok.terhalang)'), strtolower($terhalang));
        }
        if(!empty($geser)){
            $patok = $patok->where(DB::raw('lower(patok.geser)'), strtolower($geser));
        }
        if(!empty($ideal)){
            $patok = $patok->
            where([
                ['patok.rusak', '=', 'Tidak'],
                ['patok.hilang', '=', 'Tidak'],
                ['patok.terhalang', '=', 'Tidak'],
                ['patok.geser', '=', 'Tidak'],
            ]);
        }
        if(!empty($kuartal)){
            $patok = $patok->where(DB::raw('lower(patok.periode)'), strtolower($kuartal));
        }


        $patok = $patok->get();

        return $this->sendResponse($patok, 'Data patok successfully retrieved.');



    }
}
