<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Yajra\DataTables\DataTables;
use App\DataTable\PatokDataTable;
use App\DataTable\ProsesDataTable;

use App\Models\Patok;
use App\Models\RuasJalan;

class PatokController extends AppBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $kategori = Kategori::pluck('nama', 'id');
        $jalan = RuasJalan::pluck('nama', 'nama');


        if ($request->ajax()) {


            return DataTables::of((new PatokDataTable())->get($request->only(['kategori_id'])))->make(true);

        }

        return view('admin.patok.index', compact('kategori', 'jalan'));


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //

        $detail_patok = Patok::select("*")->where('id', $id)->orderBy('id', 'DESC')->with("image", "user")->first();

        return $this->sendResponse($detail_patok, 'Layer  successfully retrieved.');

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'kategori' => 'required',
            'nilaikm' => 'required',
            'nilaihm' => 'required',
            'wilayah' => 'required',
            'jalan' => 'required',
            'rusak' => 'required',
            'hilang' => 'required',
            'terhalang' => 'required',
            'geser' => 'required',
            'statuspatok' => 'required',
        ]);

        $km = $request->get('nilaikm');
        $hm = $request->get('nilaihm');
        $nama = $request->get('nama');



        $namaPatok = "{$nama} KM.{$km}+{$hm}00";


        $patok = Patok::find($id);

        $patok->nama = $namaPatok;
        $patok->kategori_id = $request->get('kategori');
        $patok->nilai_km = $request->get('nilaikm');
        $patok->nilai_hm = $request->get('nilaihm');
        $patok->wilayah = $request->get('wilayah');
        $patok->ruas_jalan = $request->get('jalan');
        $patok->rusak = $request->get('rusak');
        $patok->hilang = $request->get('hilang');
        $patok->terhalang = $request->get('terhalang');
        $patok->geser = $request->get('geser');
        $patok->status = $request->get('statuspatok');
        $patok->deskripsi = $request->get('deskripsi');


        $patok->save();



        return $this->sendSuccess('Patok berhasil diubah.');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function proses(Request $request)
    {
        //
        $kategori = Kategori::pluck('nama', 'id');
        $jalan = RuasJalan::pluck('nama', 'nama');

        if ($request->ajax()) {
            return DataTables::of((new ProsesDataTable())->get($request->only(['kategori_id'])))->make(true);

        }
        return view('kepala.proses.index', compact('kategori', 'jalan'));
    }
}
