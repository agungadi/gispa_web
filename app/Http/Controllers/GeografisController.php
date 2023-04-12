<?php

namespace App\Http\Controllers;

use App\DataTable\GeografisDataTable;
use App\Models\KelompokData;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use App\Models\Geografis;
use Yajra\DataTables\DataTables;
use DB;
use Illuminate\Support\Facades\Crypt;

class GeografisController extends AppBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $keldata = KelompokData::pluck('nama', 'id');

        $geo = Geografis::query()->select('geografis.*')->get();

        if ($request->ajax()) {
            return DataTables::of((new GeografisDataTable())->get($request->only(['kel_data'])))->make(true);
        }

        return view('admin.geografis.index', compact('keldata', 'geo'));

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
            'nama' => 'required',
            'keterangan' => 'required',
            'keldata' => 'required',
            'tipe' => 'required',
            // 'kolom[]' => 'required',
            // 'kolomselect[]' => 'required',
        ]);

        // dd($request->all());
        // return response()->json([
        //     'product' => $request->all(),
        // ]);



        $arr_req = json_decode(json_encode($request->all()), true);
        extract($arr_req);
        $array_isi_field=array();
        $array_isi_field_choro=array();
        $list_field = "";
        $namatb = str_replace(' ', '', $nama);
        $convertString = preg_replace('/\s+/', '_', $namatb);
        $toLowerString = strtolower($convertString);
        $nama_tabel = "tb_$toLowerString";



        for ($i=0; $i < sizeof($kolom); $i++) {
            if(!empty($kolom[$i])){
              $fieldnya = str_replace("'", "`", $kolom[$i]);
              $fieldnya = str_replace('"', "``", $fieldnya);
              $fieldnya = str_replace(' ', "_", $fieldnya);
              $fieldnya = 'f_'.strtolower($fieldnya);
              $list_field .= " $fieldnya $kolomselect[$i],";
              array_push($array_isi_field, "{$kolomselect[$i]}||{$fieldnya}||{$kolom[$i]}");
            } else {
              array_push($array_isi_field, "");
            }
          }

          $res_count = DB::table('geografis')->where('nama_tabel', $nama_tabel)->first();

          if($res_count){
            return('Tabel Sudah Ada');
            exit();
        }



        $query_table = "CREATE TABLE $nama_tabel(
            id serial NOT NULL,
            {$list_field}
            geojson text,
            created_at timestamp with time zone DEFAULT now(),
            CONSTRAINT ".$nama_tabel."_pkey PRIMARY KEY (id)
            )";
            $res_create_table = DB::select($query_table);

            $sum = sizeof($array_isi_field);

            for ($i = $sum; $i < 8; $i++) {
                array_push($array_isi_field, "");
            }

            $arr_data = [
                'nama' => $nama
                , 'keterangan' => $keterangan
                , 'nama_tabel' => $nama_tabel
                , 'tipe' => $tipe
                , 'kelompok_data' => $keldata
                , 'field1' => $array_isi_field[0]
                , 'field2' => $array_isi_field[1]
                , 'field3' => $array_isi_field[2]
                , 'field4' => $array_isi_field[3]
                , 'field5' => $array_isi_field[4]
                , 'field6' => $array_isi_field[5]
                , 'field7' => $array_isi_field[6]
                , 'field8' => $array_isi_field[7]
            ];

            $result = DB::table('geografis')->insert($arr_data);

            return $this->sendResponse($result, "Geografis Berhasil Ditambahkan");


            // return $this->sendResponse("adadada", json_encode($arr_data));





        // $geo = new Geografis();
        // $geo->nama = $request->get('nama');
        // $geo->keterangan = $request->get('keterangan');
        // $geo->tipe = $request->get('tipe');
        // $geo->kelompok_data = $request->get('keldata');

        // $geo->save();


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
    public function edit(Geografis $id)
    {
        //
        // dd($id);
        $enkripsi = json_decode($id);

        $encrypted = Crypt::encryptString($enkripsi->nama_tabel . "||" . $enkripsi->id);

        $enkripsi->enkrip =  $encrypted;


        // dd($enkripsi);

        // $json = json_encode($enkripsi);


        // dd($encrypted);

        return $this->sendResponse($enkripsi,  'Item Pernyataaan  successfully retrieved.');

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
            'nama' => 'required',
            'keterangan' => 'required',
            'keldata' => 'required',
            'tipe' => 'required',
            // 'kolom[]' => 'required',
            // 'kolomselect[]' => 'required',
        ]);


        $geo = Geografis::find($id);

        $geo->nama = $request->get('nama');
        $geo->keterangan = $request->get('keterangan');
        $geo->tipe = $request->get('tipe');
        $geo->kelompok_data = $request->get('keldata');

        if(!empty($request->get('field1'))){
            $field = $request->get('field1');
            $fieldnya = 'f_'.strtolower($request->get('field1'));
            $types = $request->get('type_of_name1');

            $geo->field1 = "$types||$fieldnya||$field";
        }

        if(!empty($request->get('field2'))){
            $field = $request->get('field2');
            $fieldnya = 'f_'.strtolower($request->get('field2'));
            $types = $request->get('type_of_name2');

            $geo->field2 = "$types||$fieldnya||$field";
        }

        if(!empty($request->get('field3'))){
            $field = $request->get('field3');
            $fieldnya = 'f_'.strtolower($request->get('field3'));
            $types = $request->get('type_of_name3');

            $geo->field3 = "$types||$fieldnya||$field";
        }

        if(!empty($request->get('field4'))){
            $field = $request->get('field4');
            $fieldnya = 'f_'.strtolower($request->get('field4'));
            $types = $request->get('type_of_name4');

            $geo->field4 = "$types||$fieldnya||$field";
        }

        if(!empty($request->get('field4'))){
            $field = $request->get('field4');
            $fieldnya = 'f_'.strtolower($request->get('field4'));
            $types = $request->get('type_of_name4');

            $geo->field4 = "$types||$fieldnya||$field";
        }

        if(!empty($request->get('field5'))){
            $field = $request->get('field5');
            $fieldnya = 'f_'.strtolower($request->get('field5'));
            $types = $request->get('type_of_name5');

            $geo->field5 = "$types||$fieldnya||$field";
        }
        if(!empty($request->get('field6'))){
            $field = $request->get('field6');
            $fieldnya = 'f_'.strtolower($request->get('field6'));
            $types = $request->get('type_of_name6');

            $geo->field6 = "$types||$fieldnya||$field";
        }
        if(!empty($request->get('field7'))){
            $field = $request->get('field7');
            $fieldnya = 'f_'.strtolower($request->get('field7'));
            $types = $request->get('type_of_name7');

            $geo->field7 = "$types||$fieldnya||$field";
        }
        if(!empty($request->get('field8'))){
            $field = $request->get('field8');
            $fieldnya = 'f_'.strtolower($request->get('field8'));
            $types = $request->get('type_of_name8');

            $geo->field8 = "$types||$fieldnya||$field";
        }

        $geo->save();

        return $this->sendSuccess('Geografis berhasil diubah.');
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
        $data_geo = DB::table('geografis')->where('id', $id)->first();

        $nama_tabel = $data_geo->nama_tabel;
        $query_table = " DROP TABLE $nama_tabel  ";
        $res_create_table = DB::select($query_table);

        Geografis::find($id)->delete();

        return $this->sendSuccess('Geografis berhasil dihapus.');
    }

    public function peta(Request $request)
    {
        // $wkt = $request->wkt;
        // dd($wkt);
        // return view('peta.leaflet', compact('wkt'));
        return view('peta.leaflet');

    }
}
