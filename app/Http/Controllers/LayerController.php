<?php

namespace App\Http\Controllers;

use App\DataTable\LayerDataTable;
use App\Models\Layer;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use App\Models\Geografis;
use Yajra\DataTables\DataTables;

class LayerController extends AppBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $keldata = Geografis::pluck('nama', 'id');


        if ($request->ajax()) {
            return DataTables::of((new LayerDataTable())->get($request->only(['kel_data'])))->make(true);
        }

        return view('admin.layers.index', compact('keldata'));

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
        $this->validate($request, [
            'geografis' => 'required',
            'nama' => 'required',
            'border' => 'required',
            'tebalborder' => 'required',
            'opacity' => 'required',
            'tebalborder' => 'required',
        ]);


        $geo = new Layer();
        $geo->geografis_id = $request->get('geografis');
        $geo->nama = $request->get('nama');
        $geo->warna = $request->get('warna');
        $geo->warna_border = $request->get('border');
        $geo->tebal_border = $request->get('tebalborder');
        $geo->opacity = $request->get('opacity');

        $geo->save();

        return $this->sendResponse($geo, 'Layer berhasil disimpan.');
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
    public function edit(Layer $id)
    {
        //
        return $this->sendResponse($id, 'Layer  successfully retrieved.');

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
        $this->validate($request, [
            'geografis' => 'required',
            'nama' => 'required',
            'border' => 'required',
            'tebalborder' => 'required',
            'opacity' => 'required',
            'tebalborder' => 'required',
        ]);

        $geo = Layer::find($id);

        $geo->geografis_id = $request->get('geografis');
        $geo->nama = $request->get('nama');
        $geo->warna = $request->get('warna');
        $geo->warna_border = $request->get('border');
        $geo->tebal_border = $request->get('tebalborder');
        $geo->opacity = $request->get('opacity');

        $geo->save();

        return $this->sendSuccess('Layer berhasil diubah.');
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
}
