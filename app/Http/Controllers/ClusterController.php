<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use App\DataTable\ClusterDataTable;
use App\Models\Patok;
use App\Models\RuasJalan;
use App\Http\Controllers\AppBaseController;
use App\Models\Kategori;
use DB;
use Illuminate\Support\Facades\Crypt;

class ClusterController extends AppBaseController
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


            return DataTables::of((new ClusterDataTable())->get($request->only(['kategori_id'])))->make(true);

        }



        return view('admin.cluster.index', compact('kategori', 'jalan'));

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



    public function getDetail(Request $request){


        $encrypted = Crypt::encryptString($request->wilayah . "||" . $request->nilai_km. "||" . $request->ruas_jalan. "||" . $request->cluster);


        // $query = Patok::query()->select('patok.*')
        // ->where([
        //     ['patok.wilayah', '=', $request->wilayah],
        //     ['patok.ruas_jalan', '=', $request->ruas_jalan],
        //     ['patok.nilai_km', '=', $request->nilai_km]
        // ])->get();

        // return [
        //     'min' => $query,

        // ];

        return $this->sendResponse($encrypted, 'Data patok successfully retrieved.');

    }


    public function detailCluster(Request $request, $enc){

        $kategori = Kategori::pluck('nama', 'id');
        $jalan = RuasJalan::pluck('nama', 'nama');

        $decrypted = Crypt::decryptString($enc);

        $arr = explode("||", $decrypted);


        $wilayah = $arr[0];
        $nilai_km = $arr[1];
        $ruas_jalan = $arr[2];
        $cluster = $arr[3];


        $query = Patok::query()->select('patok.*')
        ->where([
            ['patok.wilayah', '=', $wilayah],
            ['patok.ruas_jalan', '=', $ruas_jalan],
            ['patok.nilai_km', '=', $nilai_km]
        ])->get();


        if ($request->ajax()) {
            return DataTables::of($query)->make(true);
        }

        return view('admin.cluster.detail.index', compact('ruas_jalan', 'nilai_km', 'cluster', 'kategori', 'jalan'));



        // return [
        //     'min' => $query,
        //     'ruas_jalan' => $ruas_jalan,
        //     'nilai_km' => $nilai_km,
        //     'wilayah' => $wilayah,

        // ];

        // return $this->sendResponse($encrypted, 'Data patok successfully retrieved.');

    }
    public function homeCluster(Request $request){


        $data = DB::table('patok')
        ->select('wilayah', 'ruas_jalan', 'nilai_km',
            DB::raw('SUM(CASE WHEN rusak = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_rusak'),
            DB::raw('SUM(CASE WHEN hilang = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_hilang'),
            DB::raw('SUM(CASE WHEN terhalang = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_terhalang'),
            DB::raw('SUM(CASE WHEN geser = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_geser'))
        ->groupBy('wilayah', 'ruas_jalan', 'nilai_km')
        ->orderBy('wilayah', 'asc')
        ->orderBy('ruas_jalan', 'asc')
        ->orderBy('nilai_km', 'asc')
        ->get();


        $arrayTemp = [];
        $arrayOri = [];
        // untuk mendapatkan data total seluruh kerusakan setiap row/array
        foreach($data as $sum){
            $arrayTemp[] = $sum->jumlah_rusak + $sum->jumlah_hilang + $sum->jumlah_terhalang + $sum->jumlah_geser;
            $arrayOri[] = $sum->jumlah_rusak + $sum->jumlah_hilang + $sum->jumlah_terhalang + $sum->jumlah_geser;
        }

        sort($arrayTemp); // Urutkan array dari nilai terkecil ke terbesar
        $min = $arrayTemp[0];
        $max = end($arrayTemp);
        $middleIndex = floor(count($arrayTemp) / 2);
        $middle = $arrayTemp[$middleIndex]; // Nilai tengah-tengah

        // menampung data array iterasi pertama
        $tempCentroid = array();

        $tempCentroid[0][] = $data[array_search($min, $arrayOri)];
        $tempCentroid[0][] = $data[array_search($middle, $arrayOri)];
        $tempCentroid[0][] = $data[array_search($max, $arrayOri)];





        // mengolah centroid pertama
        $centroid = array();
        $centroid[0] = $this->transformArray($tempCentroid[0]);


        $hasil_iterasi = [];
		$hasil_cluster = [];

        //iterasi
        $iterasi = 0;
        while (true) {
            // menampung setiap iterasi
			$table_iterasi = array();

            foreach ($data as $key => $value) {

				//untuk setiap table centroid pada iterasi ke i
				$table_iterasi[$key]['data'] = $value;

				foreach ($centroid[$iterasi] as $key_c => $value_c) {

					//hitung jarak euclidean
					$table_iterasi[$key]['jarak_ke_centroid'][] =  $this->jarakEuclidean($value, $value_c);
				}
				//hitung jarak terdekat dan tentukan cluster nya
				$table_iterasi[$key]['jarak_terdekat'] = $this->jarakTerdekat($table_iterasi[$key]['jarak_ke_centroid']);
			}

            array_push($hasil_iterasi, $table_iterasi);
            $centroid[++$iterasi] = $this->perbaruiCentroid($table_iterasi, $hasil_cluster);
			$lanjutkan = $this->centroidBerubah($centroid, $iterasi);


            if (!$lanjutkan)
				break;
        }


        if ($request->ajax()) {
            return DataTables::of(end($hasil_iterasi))->make(true);
        }

        // dd(end($hasil_iterasi));

        return view('admin.cluster.index', compact('data', 'hasil_iterasi', 'centroid'));


        // $query =  Patok::select([
        //     'wilayah',
        //     'ruas_jalan',
        //     'nilai_km'
        // ])
        // ->groupBy('wilayah','ruas_jalan', 'nilai_km')
        // ->orderBy('nilai_km', 'DESC')->get();
        // dd(end($hasil_iterasi));


        // return [
        //     'min' => end($hasil_iterasi),
        //     // 'max' => $data,
        //     // 'middle' => $middle,
        //     // 'iterasi' => $iterasi,
        //     // 'searchIndex' => $hasil_iterasi
        // ];


    }

    public function iterasi()
    {
        //

        $data = DB::table('data_knn')->get();

        $centroid1 = [];
        $arrayOri = [];
        foreach($data as $sum){
            $centroid1[] = $sum->hr + $sum->pr + $sum->qrs;
            $arrayOri[] = $sum->hr + $sum->pr + $sum->qrs;
        }


        sort($centroid1); // Urutkan array dari nilai terkecil ke terbesar
        $min = $centroid1[0];
        $max = end($centroid1);
        $middleIndex = floor(count($centroid1) / 2);
        $middle = $centroid1[$middleIndex]; // Nilai tengah-tengah


        $centroidSatu = array();

        $centroidSatu[0][] = $data[array_search($min, $arrayOri)];
        $centroidSatu[0][] = $data[array_search($middle, $arrayOri)];
        $centroidSatu[0][] = $data[array_search($max, $arrayOri)];


        $centroid = array();
        $centroid[0] = $this->transformArray($centroidSatu[0]);



        // $hasil = $this->jarakEuclidean($data, $centroidSatu);


        $hasil_iterasi = [];
		$hasil_cluster = [];

        //iterasi
		$iterasi = 0;
        while (true) {
			$table_iterasi = array();

			foreach ($data as $key => $value) {

				//untuk setiap table centroid pada iterasi ke i
				$table_iterasi[$key]['data'] = $value;

				foreach ($centroid[$iterasi] as $key_c => $value_c) {

					//hitung jarak euclidean
                    // dd($value, $centroidSatu[$iterasi]);
					$table_iterasi[$key]['jarak_ke_centroid'][] =  $this->jarakEuclidean($value, $value_c);
				}
				//hitung jarak terdekat dan tentukan cluster nya
				$table_iterasi[$key]['jarak_terdekat'] = $this->jarakTerdekat($table_iterasi[$key]['jarak_ke_centroid']);
			}

            array_push($hasil_iterasi, $table_iterasi);
			$centroid[++$iterasi] = $this->perbaruiCentroid($table_iterasi, $hasil_cluster);
			$lanjutkan = $this->centroidBerubah($centroid, $iterasi);

            // dd($lanjutkan);

            if (!$lanjutkan)
				break;
            // dd($centroidSatu);

        }

        $patok =  Patok::select([
            'wilayah',
            'ruas_jalan',
            'nilai_km'
        ])
        ->groupBy('wilayah','ruas_jalan', 'nilai_km')
        ->orderBy('nilai_km', 'DESC')
        ->get();


        $patokAll =  Patok::query()->select('patok.wilayah','patok.ruas_jalan', 'patok.nilai_km', 'patok.rusak', 'patok.hilang', 'patok.terhalang', 'patok.geser')->get();
        // ->groupBy('wilayah','ruas_jalan', 'nilai_km')
        // ->orderBy('nilai_km', 'DESC')
        // ->get();


        // $data = DB::table('patok')
        // ->select('wilayah', 'ruas_jalan', 'nilai_km')
        // ->selectRaw('SUM(CASE WHEN rusak = "Ya" THEN 1 ELSE 0 END) AS rusak')
        // ->selectRaw('SUM(CASE WHEN hilang = "Ya" THEN 1 ELSE 0 END) AS hilang')
        // ->selectRaw('SUM(CASE WHEN terhalang = "Ya" THEN 1 ELSE 0 END) AS terhalang')
        // ->selectRaw('SUM(CASE WHEN geser = "Ya" THEN 1 ELSE 0 END) AS geser')
        // ->where('wilayah', '=', 'Tuban')
        // ->where('ruas_jalan', '=', 'Pakah - Ponco')
        // ->groupBy('wilayah', 'ruas_jalan', 'nilai_km')
        // ->orderBy('nilai_km')
        // ->get();



        $results = DB::table('patok')
        ->select('wilayah', 'ruas_jalan', 'nilai_km',
            DB::raw('SUM(CASE WHEN rusak = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_rusak'),
            DB::raw('SUM(CASE WHEN hilang = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_hilang'),
            DB::raw('SUM(CASE WHEN terhalang = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_terhalang'),
            DB::raw('SUM(CASE WHEN geser = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_geser'))
        ->groupBy('wilayah', 'ruas_jalan', 'nilai_km')
        ->orderBy('wilayah', 'asc')
        ->orderBy('ruas_jalan', 'asc')
        ->orderBy('nilai_km', 'asc')
        ->get();
        return [
            // 'min' => $patok,
            'max' => $results,
            // 'middle' => $middle,
            // 'iterasi' => $iterasi,
            // 'searchIndex' => $hasil_iterasi
        ];

        // dd(($centroid1));

    }

    function jarakEuclidean($data, $centroid)
    {
        $calc = sqrt(pow(($data->jumlah_rusak - $centroid[0]), 2) + pow(($data->jumlah_hilang - $centroid[1]), 2) + pow(($data->jumlah_terhalang - $centroid[2]), 2) + pow(($data->jumlah_geser - $centroid[3]), 2));
        // dd($calc);

        return $calc;
    }

    function jarakTerdekat($jarak_ke_centroid){

        // dd($jarak_ke_centroid);
        foreach ($jarak_ke_centroid as $key => $value) {
            if (!isset($minimum)) {
                $minimum = $value;
                $cluster = ($key + 1);
                continue;
            } else if ($value < $minimum) {
                $minimum = $value;
                $cluster = ($key + 1);
            } else if ($value < $minimum) {
                $minimum = $value;
                $cluster = ($key + 1);
            }
        }
        return array(
            'cluster' => $cluster,
            'value' => $minimum,
        );
    }

    function perbaruiCentroid($table_iterasi, $hasil_cluster){
        $hasil_cluster = [];
        // dd($hasil_cluster[($value['jarak_terdekat']['cluster'] - 1)][0][]);
        //looping untuk mengelompokan x dan y sesuai cluster

        foreach ($table_iterasi as $key => $value) {
            $hasil_cluster[($value['jarak_terdekat']['cluster'] - 1)][0][] = $value['data']->jumlah_rusak; //data x
            $hasil_cluster[($value['jarak_terdekat']['cluster'] - 1)][1][] = $value['data']->jumlah_hilang; //data y
            $hasil_cluster[($value['jarak_terdekat']['cluster'] - 1)][2][] = $value['data']->jumlah_terhalang; //data z
            $hasil_cluster[($value['jarak_terdekat']['cluster'] - 1)][3][] = $value['data']->jumlah_geser; //data w
        }



        $new_centroid = [];
        foreach ($hasil_cluster as $key => $value) {
            // dd(array_sum($value[3]));
            $new_centroid[$key] = [
                array_sum($value[0]) / count($value[0]),
                array_sum($value[1]) / count($value[1]),
                array_sum($value[2]) / count($value[2]),
                array_sum($value[3]) / count($value[3])
            ];
        }


        ksort($new_centroid);

        return $new_centroid;
    }

    function centroidBerubah($centroid, $iterasi)
    {
        $centroid_lama = $this->flatten_array($centroid[($iterasi - 1)]); //flattern array
		$centroid_baru = $this->flatten_array($centroid[$iterasi]); //flatten array
		//hitbandingkan centroid yang lama dan baru jika berubah return true, jika tidak berubah/jumlah sama=0 return false
			$jumlah_sama = 0;
			for ($i = 0; $i < count($centroid_lama); $i++) {
				if ($centroid_lama[$i] === $centroid_baru[$i]) {
					$jumlah_sama++;
				}
			}
		return $jumlah_sama === count($centroid_lama) ? false : true;
    }

    function flatten_array($arg)
    {
        return is_array($arg) ? array_reduce($arg, function ($c, $a) {
            return array_merge($c, $this->flatten_array($a));
        }, []) : [$arg];
    }



    public function transformArray(array $array)
    {

        $newArray = array_map(function ($item) {

            return [
                $item->jumlah_rusak,
                $item->jumlah_hilang,
                $item->jumlah_terhalang,
                $item->jumlah_geser

            ];
        }, $array);



        return $newArray;
    }

    public function PetaCluster(Request $request){


        $data = DB::table('patok')
        ->select('wilayah', 'ruas_jalan', 'nilai_km',
            DB::raw('SUM(CASE WHEN rusak = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_rusak'),
            DB::raw('SUM(CASE WHEN hilang = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_hilang'),
            DB::raw('SUM(CASE WHEN terhalang = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_terhalang'),
            DB::raw('SUM(CASE WHEN geser = \'Ya\' THEN 1 ELSE 0 END) AS jumlah_geser'))
        ->groupBy('wilayah', 'ruas_jalan', 'nilai_km')
        ->orderBy('wilayah', 'asc')
        ->orderBy('ruas_jalan', 'asc')
        ->orderBy('nilai_km', 'asc')
        ->get();


        $arrayTemp = [];
        $arrayOri = [];
        // untuk mendapatkan data total seluruh kerusakan setiap row/array
        foreach($data as $sum){
            $arrayTemp[] = $sum->jumlah_rusak + $sum->jumlah_hilang + $sum->jumlah_terhalang + $sum->jumlah_geser;
            $arrayOri[] = $sum->jumlah_rusak + $sum->jumlah_hilang + $sum->jumlah_terhalang + $sum->jumlah_geser;
        }

        sort($arrayTemp); // Urutkan array dari nilai terkecil ke terbesar
        $min = $arrayTemp[0];
        $max = end($arrayTemp);
        $middleIndex = floor(count($arrayTemp) / 2);
        $middle = $arrayTemp[$middleIndex]; // Nilai tengah-tengah

        // menampung data array iterasi pertama
        $tempCentroid = array();

        $tempCentroid[0][] = $data[array_search($min, $arrayOri)];
        $tempCentroid[0][] = $data[array_search($middle, $arrayOri)];
        $tempCentroid[0][] = $data[array_search($max, $arrayOri)];





        // mengolah centroid pertama
        $centroid = array();
        $centroid[0] = $this->transformArray($tempCentroid[0]);


        $hasil_iterasi = [];
		$hasil_cluster = [];

        $nilaiCluster = $request->cluster;

        //iterasi
        $iterasi = 0;
        while (true) {
            // menampung setiap iterasi
			$table_iterasi = array();

            foreach ($data as $key => $value) {

				//untuk setiap table centroid pada iterasi ke i
				$table_iterasi[$key]['data'] = $value;

				foreach ($centroid[$iterasi] as $key_c => $value_c) {

					//hitung jarak euclidean
					$table_iterasi[$key]['jarak_ke_centroid'][] =  $this->jarakEuclidean($value, $value_c);
				}
				//hitung jarak terdekat dan tentukan cluster nya
				$table_iterasi[$key]['jarak_terdekat'] = $this->jarakTerdekat($table_iterasi[$key]['jarak_ke_centroid']);
			}

            array_push($hasil_iterasi, $table_iterasi);
            $centroid[++$iterasi] = $this->perbaruiCentroid($table_iterasi, $hasil_cluster);
			$lanjutkan = $this->centroidBerubah($centroid, $iterasi);


            if (!$lanjutkan)
				break;
        }


        // if ($request->ajax()) {
        //     return DataTables::of(end($hasil_iterasi))->make(true);
        // }

        // dd(end($hasil_iterasi));

        // return view('admin.cluster.index', compact('data', 'hasil_iterasi', 'centroid'));


        // $query =  Patok::select([
        //     'wilayah',
        //     'ruas_jalan',
        //     'nilai_km'
        // ])
        // ->groupBy('wilayah','ruas_jalan', 'nilai_km')
        // ->orderBy('nilai_km', 'DESC')->get();
        // dd(end($hasil_iterasi));

        $result = array_filter(end($hasil_iterasi), function($value)  use ($nilaiCluster) {
            return $value['jarak_terdekat']['cluster'] == $nilaiCluster;
        });



        $query = Patok::query()->select('patok.*');
        // $query = DB::table('patok');

        // Patok::select("*")
        foreach($result as $datas){
            // dd($datas['data']->nilai_km);
            $query->orWhere([
                ['patok.wilayah', '=', $datas['data']->wilayah],
                ['patok.ruas_jalan', '=', $datas['data']->ruas_jalan],
                ['patok.nilai_km', '=', $datas['data']->nilai_km],
            ]);
        };


        // ->orWhere([
        //     ['patok.wilayah', '=', "Tuban"],
        //     ['patok.ruas_jalan', '=', "Pakah - Ponco"],
        //     ['patok.nilai_km', '=', "6"]
        // ])

        // $query = Patok::query()->select('patok.*');
        $data = $query->get();

        return $this->sendResponse($data, 'Data patok successfully retrieved.');

        // return ['data' => $data];

        // return [
        //     'min' => $query->toJson(),
            // 'max' => $data,
            // 'middle' => $middle,
            // 'iterasi' => $iterasi,
            // 'searchIndex' => $hasil_iterasi
        // ];


    }

}
