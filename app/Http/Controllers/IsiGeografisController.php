<?php

namespace App\Http\Controllers;

use App\Models\Geografis;
use App\Models\IsiGeografis;

use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\Crypt;
use DB;
use App\Http\Controllers\AppBaseController;
use RealRashid\SweetAlert\Facades\Alert;

class IsiGeografisController extends AppBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $enc)
    {
        $decrypted = Crypt::decryptString($enc);

        $arr = explode("||", $decrypted);

        $en = $arr[0];
        $ids = $arr[1];
        // dd($en);



        // dd($decrypted);

        // dd($decrypted);

        // dd($qs);

        $geo = Geografis::where('id', $ids)->first();
        $tabel = DB::table($en)->orderBy('id','desc')->get();

        // $table = Geografis::where('id', $enc)->first();
        // if ($request->ajax()) {
        //     return DataTables::of($qs = DB::table($decrypted)->orderBy('id','desc')->get())->make(true);
        // }
        return view('admin.isigeografis.index', compact('geo', 'tabel', 'en'));

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
        // $this->validate($request, [
        //     'geojson' => 'required',
        // ]);


        $id_geo = $request->getId;

        $geo = Geografis::whereId($id_geo)->first();

        $arr_data=[
            'geojson' => $request->geojson
        ];


        $field1 = explode("||", $geo->field1);
        $field2 = explode("||", $geo->field2);
        $field3 = explode("||", $geo->field3);
        $field4 = explode("||", $geo->field4);
        $field5 = explode("||", $geo->field5);
        $field6 = explode("||", $geo->field6);
        $field7 = explode("||", $geo->field7);
        $field8 = explode("||", $geo->field8);



        for ($i=1; $i <= 8; $i++) {
            if(!empty($geo->{'field'.$i}))
            {
                $arr_data = $arr_data+[${'field'.$i}[1] => $request->{${'field'.$i}[1]}];
            }
        }



        $inset = DB::table($geo->nama_tabel)
        ->insert($arr_data);


        // session()->put('status', 'Data Geografis Berhasil disimpan');
        // return back();
        return $this->sendResponse($inset, "Isi Geografis Berhasil Ditambahkan");
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
    public function edit(Request $request)
    {
        //
        dd("asasa");

        // $geo = Geografis::whereId($request->id_geo)->first();
        // dd($geo);
        // $nama_tabel = $geo->nama_tabel;
        // $data=DB::table($nama_tabel)->where('id', $request->id)->first();

        // return $this->sendResponse($data,  'Data Geografis successfully retrieved.');

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
            'geojson' => 'required',
        ]);


        $id_geo = $request->getId;

        $geo = Geografis::whereId($id_geo)->first();

        $arr_data=[
            'geojson' => $request->geojson
        ];

        $field1 = explode("||", $geo->field1);
        $field2 = explode("||", $geo->field2);
        $field3 = explode("||", $geo->field3);
        $field4 = explode("||", $geo->field4);
        $field5 = explode("||", $geo->field5);
        $field6 = explode("||", $geo->field6);
        $field7 = explode("||", $geo->field7);
        $field8 = explode("||", $geo->field8);

        for ($i=1; $i <= 8; $i++) {
            if(!empty($geo->{'field'.$i}))
            {
                $arr_data = $arr_data+[${'field'.$i}[1] => $request->{${'field'.$i}[1]}];
            }
        }





        $inset = DB::table($geo->nama_tabel)
        ->where('id', $id)
        ->update($arr_data);

        return $this->sendResponse($inset,  "Data Geografis Berhasil Diubah");


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

    public function editData(Request $request)
    {
        //
        // dd("asasa");

        $geo = Geografis::whereId($request->idgeo)->first();

        $nama_tabel = $geo->nama_tabel;
        $data= DB::table($nama_tabel)->where('id', $request->id)->first();

        return $this->sendResponse($geo,  'Data Geografis successfully retrieved.');

    }

    public function hasil(Request $request){
        $geo = Geografis::whereId($request->idgeo)->first();

        $nama_tabel = $geo->nama_tabel;

        $data= DB::table($nama_tabel)->where('id', $request->id)->first();


        // dd($data);
        for ($i = 1; $i <= 8; $i++) {
            $field = explode("||", $geo->{'field' . $i});

            if(sizeof($field) >= 2){
                $kolom = $field[1];
                $data->{'field' . $i} = $data->$kolom;
            }else{
                $data->{'field' . $i} = $field[0];
            }

        }
        // dd($data);

        return $this->sendResponse($data, 'Data Geografis successfully retrieved.');
        }

        public function hapus(Request $request, $id)
        {
            $id_geo = $request->idgeo;
            $geo = Geografis::whereId($id_geo)->first();

            $nama_tabel = $geo->nama_tabel;
            $delete=DB::table($nama_tabel)->where('id', $request->id)->delete();

            return $this->sendSuccess('Geografis berhasil dihapus.');

        }
}
