<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PetaController extends Controller
{
    //

    public function index(Request $request)
    {
        //
        // $keldata = Geografis::pluck('nama', 'id');


        // if ($request->ajax()) {
        //     return DataTables::of((new LayerDataTable())->get($request->only(['kel_data'])))->make(true);
        // }



        return view('peta.tampil_peta');

    }
}
