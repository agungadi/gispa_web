<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Images;
use App\Models\User;

use App\Models\Patok;
use App\Models\RuasJalan;
use Illuminate\Http\Request;
use DB;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use App\Models\Geografis;

use function PHPUnit\Framework\callback;

class ApiPatokController extends Controller
{
    //
    public function patok_limit(Request $request)
    {
        $id_user = auth('api')->user()->id;

        $search = $request->search;
        $kategori = $request->kategori;
        $wilayah = $request->wilayah;
        $ruas_jalan = $request->ruas_jalan;
        $rusak = $request->rusak;
        $hilang = $request->hilang;
        $terhalang = $request->terhalang;
        $geser = $request->geser;
        $status = $request->status;


        $patok = DB::table('patok')
        ->join("images", "patok.image_id", "=", "images.id")
        ->join("kategori", "kategori.id", "=", "patok.kategori_id")
        ->join("users", "users.id", "=" , "patok.id_user")
        ->orderBy('patok.id', 'DESC')
        ->select("patok.id","patok.nama as nama_patok", "kategori.nama as nama_kategori", "users.nama as nama_user"
        ,"patok.ruas_jalan", "patok.wilayah", "patok.rusak", "patok.hilang", "patok.geser", "patok.terhalang",
        "images.path as path", "images.path_new as path_new", "patok.status", "patok.status_geser", "patok.created_at");

        if(!empty($search)){
            $patok = $patok->where(function ($query) use ($request) {
                $query->where('patok.nama', 'ilike', '%'.$request->search.'%')
                ->orWhere('kategori.nama', 'ilike', '%'.$request->search.'%')
                ->orWhere('patok.ruas_jalan', 'ilike', '%'.$request->search.'%')
                ->orWhere('patok.wilayah', 'ilike', '%'.$request->search.'%')
                ->orWhere('patok.status', 'ilike', '%'.$request->search.'%')
                ->orWhere(DB::raw('patok.created_at::text'), 'ilike', '%'.$request->search.'%')
                ;
            });
        }
        if(!empty($kategori)){
            $patok = $patok->where(DB::raw('lower(kategori.nama)'), strtolower($kategori));

        }
        if(!empty($wilayah)){
            $patok = $patok->where(DB::raw('lower(patok.wilayah)'), strtolower($wilayah));
        }
        if(!empty($ruas_jalan)){
            $patok = $patok->where(DB::raw('lower(patok.ruas_jalan)'), strtolower($ruas_jalan));
        }
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
        if(!empty($status)){
            $patok = $patok->where(DB::raw('lower(patok.status)'), strtolower($status));
        }


        $patok = $patok ->paginate(6, ['*'], 'page', $request->page);

        return response()->json([
            'success' => true,
            // 'pesan' => 'Lowongan Perbulan ' . $request->limit . ' Data',
            // 'lowongan' => LowonganResource::collection($lowongan)
            'data' => $patok
        ], 200);
    }

    public function patok_list(Request $request)
    {
        $lowongan = Patok::select("*")->orderBy('id', 'DESC')->with("image", "user")->paginate($request->limit);
        return response()->json([
            'success' => true,
            'pesan' => 'patok list success',
            // 'lowongan' => LowonganResource::collection($lowongan)
            'lowongan' => $lowongan
        ], 200);
    }

    public function patok_detail($id)
    {
        $id_user = auth('api')->user()->id;

        $detail_patok = Patok::select("*")->where('id', $id)->orderBy('id', 'DESC')->with("image", "user")->first();
        return response()->json([
            'success' => true,
            // 'lowongan' => LowonganResource::collection($lowongan)
            // 'id_user' => $id_user,
            'data' => $detail_patok
        ], 200);
    }

    public function patok_cari(Request $request)
    {
        // $id_user = auth('api')->user()->id;

        $search = $request->get("search");
        $kategori = $request->get("kategori");
        $byme = $request->get("byme");
        $wilayah = $request->get("wilayah");
        $ruas_jalan = $request->get("ruas_jalan");
        $rusak = $request->get("rusak");
        $hilang = $request->get("hilang");
        $terhalang = $request->get("terhalang");
        $geser = $request->get("geser");
        $status = $request->get("status");
        $month = $request->get("month");
        $year = $request->get("year");

        // $patok = patok::all();


        $query = Patok::join("images", "patok.image_id", "=", "images.id")
        ->join("kategori", "kategori.id", "=", "patok.kategori_id")
        ->join("users", "users.id", "=" , "patok.id_user");

        if(!empty($search)){
            $query->where('kategori.nama', 'ilike', '%'.$search.'%')
            ->orWhere('kategori.singkatan', 'ilike', '%'.$search.'%')
            ->orWhere('patok.nama', 'ilike', '%'.$search.'%')
            ->orWhere('ruas_jalan', 'ilike', '%'.$search.'%')
            ->orWhere('wilayah', 'ilike', '%'.$search.'%')
            ->orWhere('status', 'ilike', '%'.$search.'%')
            ->orWhere('users.nama', 'ilike', '%'.$search.'%');
            // ->whereMonth('patok.created_at', 'ilike', '%'.$search.'%')->get();
        }
        if(!empty($kategori)){
            $query->where('kategori.singkatan', 'ILIKE', '%' . $kategori . '%');
        }
        if(!empty($byme)){
            $query->where('patok.id', 'ILIKE', '%' . $byme . '%');
        }
        if(!empty($wilayah)){
            $query->where('patok.wilayah', 'ILIKE', '%' . $wilayah . '%');
        }
        if(!empty($ruas_jalan)){
            $query->where('patok.ruas_jalan', 'ILIKE', '%' . $ruas_jalan . '%');
        }
        if(!empty($rusak)){
            $query->where('patok.rusak', 'ILIKE', '%' . $rusak . '%');
        }
        if(!empty($hilang)){
            $query->where('patok.hilang', 'ILIKE', '%' . $hilang . '%');
        }
        if(!empty($terhalang)){
            $query->where('patok.terhalang', 'ILIKE', '%' . $terhalang . '%');
        }
        if(!empty($geser)){
            $query->where('patok.geser', 'ILIKE', '%' . $geser . '%');
        }
        if(!empty($status)){
            $query->where('patok.status', 'ILIKE', '%' . $status . '%');
        }
        if(!empty($month)){
            $query->whereMonth('patok.created_at', '=' , $month)
            ->whereYear('patok.created_at', '=', $year);
        }


        $query = $query->select("patok.nama as nama_patok", "kategori.nama as nama_kategori", "users.nama as nama_user"
        ,"patok.id","patok.ruas_jalan", "patok.wilayah", "patok.rusak", "patok.hilang", "patok.geser", "patok.terhalang",
        "images.path as path", "images.path_new as path_new", "patok.status", "patok.status_geser",  "patok.created_at")->get();


        // $query = Patok::whereYear('created_at', '=', $search)
        //        ->whereMonth('created_at', '=', $search)
        //        ->get();


        // $query = DB::table('patok')->whereYear('created_at', (string) Carbon::now()->year)->get();
        // $query = DB::table('patok')->whereMonth('created_at', '=', 2)->get();


        return response()->json([
            'success' => true,
            // 'pesan' => 'Lowongan Perbulan ' . $search . ' Data',
            'data' => $query
        ], 200);



    }

    public function patok_add(Request $request)
    {

        if(empty(@response()->json(auth('api')->user())->original->id)){
            return response()->json([
                'success' => false,
                'pesan' => 'Silahkan login kembali',
                'data' => null
            ], 200);
        }else{
            if(!empty($request->image)){
                $image = $request->file('image');
                $data_image = $image->getClientOriginalName();

                $tujuan_upload = 'images/patok/';
                $image->move($tujuan_upload, $data_image);

                $path = '/images/patok/'.$data_image;

                $images = Images::create([
                    'filename' => $data_image,
                    'path' => $path
                ]);

                $idImages = $images->id;
            }





            $cekHaversine = Patok::where('nilai_km', $request->nilai_km)
            ->where('ruas_jalan', $request->ruas_jalan)
            ->where('kategori_id', 2)
            ->where('status_geser', "-")->get();




            $latlng1 = $request->latlng;
            $split1 = explode(',', $latlng1);

            $detail_patok = Patok::select('id','nama', 'kategori_id', 'ruas_jalan', 'nilai_km', 'nilai_hm', 'latlng', 'created_at')
            ->where('ruas_jalan', $request->ruas_jalan)
            ->where('nilai_km', $request->nilai_km)
            ->where('kategori_id', 1)->get();

            if($request->kategori_id == "2" && sizeof($detail_patok) >= 1){
                $latlng2 = $detail_patok[0]['latlng'];
                $split2 = explode(',', $latlng2);
                $jml = $this->fillHaversine($split2[0], $split2[1], $split1[0], $split1[1]);

                if (floatval($jml) == 0) {
                    $geser = "-";
                    $jarakGeser = "-";
                  }
                  else if (floatval($jml) <= 89 && floatval($jml) >= 1) {
                    $geser = "Ya";
                    $jarakGeser = floatval($jml);
                  } else if (str_contains($request->nama , "000")) {
                    $geser = "Tidak";
                    $jarakGeser = "0";
                  } else if (floatval($jml) >= 90 && floatval($jml) <= 110) {
                    $geser = "Tidak";
                    $jarakGeser = floatval($jml);
                  } else if (floatval($jml) >= 190 && floatval($jml) <= 210) {
                    $geser = "Tidak";
                    $jarakGeser = floatval($jml);
                  } else if (floatval($jml) >= 290 && floatval($jml) <= 310) {
                    $geser = "Tidak";
                    $jarakGeser = floatval($jml);
                  } else if (floatval($jml) >= 390 && floatval($jml) <= 410) {
                    $geser = "Tidak";
                    $jarakGeser = floatval($jml);
                  } else if (floatval($jml) >= 490 && floatval($jml) <= 510) {
                    $geser = "Tidak";
                    $jarakGeser = floatval($jml);
                  } else if (floatval($jml) >= 590 && floatval($jml) <= 610) {
                    $geser = "Tidak";
                    $jarakGeser = floatval($jml);
                  } else if (floatval($jml) >= 690 && floatval($jml) <= 710) {
                    $geser = "Tidak";
                    $jarakGeser = floatval($jml);
                  } else if (floatval($jml) >= 790 && floatval($jml) <= 810) {
                    $geser = "Tidak";
                    $jarakGeser = floatval($jml);
                  } else if (floatval($jml) >= 890 && floatval($jml) <= 910) {
                    $geser = "Tidak";
                    $jarakGeser = floatval($jml);
                  } else if (floatval($jml) >= 111 && floatval($jml) <= 1900) {
                    $geser = "Ya";
                    $jarakGeser = floatval($jml);
                  } else {
                    $geser = "Ya";
                    $jarakGeser = floatval($jml);
                  }
            }elseif($request->kategori_id == "2" && sizeof($detail_patok) == 0){
                $jml = "-";
                $geser = "-";
            }


          if($request->kategori_id == "1"){
                $jml = "0";
                $geser = "Tidak";
                foreach ($cekHaversine as $patok){
                    $latlng2 = $patok->latlng;
                    $split2 = explode(',', $latlng2);
                    $this->haversine($patok->id ,$split1[0], $split1[1], $split2[0], $split2[1]);

                }
            }
            $longlat = $request->latlng;

            $split  = explode(',', $longlat);
            $lat = doubleval($split[0]);
            $long = doubleval($split[1]);
            $koordinat = "POINT(".$long.", ".$lat.")";
            $point = "POINT(".$long." ".$lat.")";

            $a = Carbon::now();

            // $a->month($a->month-3);
            $lastQuarter = $a->quarter;
            $years = $a->year;

            $periode = "Q".$lastQuarter." ".$years;


            $patok = Patok::create([
                'kategori_id' => $request->kategori_id,
                'image_id' => $idImages,
                'id_user' => auth('api')->user()->id,
                'nama' => $request->nama,
                'nilai_km' => $request->nilai_km,
                'nilai_hm' => $request->nilai_hm,
                'wilayah' => $request->wilayah,
                'ruas_jalan' => $request->ruas_jalan,
                'hilang' => $request->hilang,
                'rusak' => $request->rusak,
                'terhalang' => $request->terhalang,
                'geser' => $geser,
                'status_geser' => $jml,
                'status' => $request->status,
                'deskripsi' => $request->deskripsi,
                'latlng' => $request->latlng,
                'longlat' => $koordinat,
                'p_longlat' => $point,
                'periode' => $periode
            ]);


            return response()->json([
                'success' => true,
                'data' => $periode,
                'pesan' => 'Lowongan Berhasil Ditambah',
            ], 200);
        }

    }


    public function patok_test(Request $request)
    {
        // $data_patok = Patok::where('id', $request->id)->with('image')->first();
        // return response()->json([
        //     'success' => true,
        //     'pesan' => 'Lowongan Berhasil Ditambah',
        //     'data' => $data_patok['image']->path
        // ], 200);



        // $rusak = $request->rusak;
        // $hilang = $request->hilang;
        // $terhalang = $request->terhalang;
        // $geser = $request->geser;
        // $ideal = $request->ideal;
        // $kuartal = $request->kuartal;


        // $patok = Patok::query()->select('patok.*');


        // if(!empty($rusak)){
        //     $patok = $patok->where(DB::raw('lower(patok.rusak)'), strtolower($rusak));
        // }
        // if(!empty($hilang)){
        //     $patok = $patok->where(DB::raw('lower(patok.hilang)'), strtolower($hilang));

        // }
        // if(!empty($terhalang)){
        //     $patok = $patok->where(DB::raw('lower(patok.terhalang)'), strtolower($terhalang));
        // }
        // if(!empty($geser)){
        //     $patok = $patok->where(DB::raw('lower(patok.geser)'), strtolower($geser));
        // }
        // if(!empty($ideal)){
        //     $patok = $patok->
        //     where([
        //         ['patok.rusak', '=', 'Tidak'],
        //         ['patok.hilang', '=', 'Tidak'],
        //         ['patok.terhalang', '=', 'Tidak'],
        //         ['patok.geser', '=', 'Tidak'],
        //     ]);
        // }
        // if(!empty($kuartal)){
        //     $patok = $patok->where(DB::raw('lower(patok.periode)'), strtolower($kuartal));
        // }

        // $patok = $patok->get();

        $patok =  Patok::select([
            'wilayah',
            'ruas_jalan',
            'nilai_km'
        ])
        ->groupBy('wilayah','ruas_jalan', 'nilai_km')
        ->orderBy('nilai_km', 'DESC')
        ->get();

        return response()->json([
            'success' => true,
            'data' => $patok
        ], 200);

    }


    public function patok_edit(Request $request)
    {

        if(empty(@response()->json(auth('api')->user())->original->id)){
            return response()->json([
                'success' => false,
                'pesan' => 'Silahkan login kembali',
                'data' => null
            ], 200);
        }else{
            $data_patok = Patok::where('id', $request->id)->with('image')->first();
            $idImages = $data_patok['image']->id;

            if(!empty($request->image)){
                $image = $request->file('image');
                $data_image = $image->getClientOriginalName();

                $tujuan_upload = 'images/patok/update';
                $image->move($tujuan_upload, $data_image);

                $path = '/images/patok/update/'.$data_image;

                $images = Images::where('id', $idImages)->update([
                    'filename_new' => $data_image,
                    'path_new' => $path
                ]);

            }
            // else{
            //     $path = $data_patok['image']->path;
            // }






            if($request->address == ""){
                $patok = Patok::where('id', $request->id)->update([
                    'kategori_id' => $request->kategori_id,
                    'image_id' => $idImages,
                    'id_user' => auth('api')->user()->id,
                    'nama' => $request->nama,
                    'nilai_km' => $request->nilai_km,
                    'nilai_hm' => $request->nilai_hm,
                    'wilayah' => $request->wilayah,
                    'ruas_jalan' => $request->ruas_jalan,
                    'hilang' => $request->hilang,
                    'rusak' => $request->rusak,
                    'terhalang' => $request->terhalang,
                    'status' => $request->status,
                    'deskripsi' => $request->deskripsi,
                    'latlng' => $request->latlng
                ]);
            }else{
                $cekHaversine = Patok::where('nilai_km', $request->nilai_km)
                ->where('ruas_jalan', $request->ruas_jalan)
                ->where('kategori_id', 2)
                ->where('status_geser', "-")->get();


                $latlng1 = $request->latlng;
                $split1 = explode(',', $latlng1);

                $detail_patok = Patok::select('id','nama', 'kategori_id', 'ruas_jalan', 'nilai_km', 'nilai_hm', 'latlng', 'created_at')
                ->where('ruas_jalan', $request->ruas_jalan)
                ->where('nilai_km', $request->nilai_km)
                ->where('kategori_id', 1)->get();

                // if($request->kategori_id == "2" && sizeof($detail_patok) >= 1){
                //     $latlng2 = $detail_patok[0]['latlng'];
                //     $split2 = explode(',', $latlng2);
                //     $jml = $this->fillHaversine($split2[0], $split2[1], $split1[0], $split1[1]);
                // }

                if($request->kategori_id == "2" && sizeof($detail_patok) >= 1){
                    $latlng2 = $detail_patok[0]['latlng'];
                    $split2 = explode(',', $latlng2);
                    $jml = $this->fillHaversine($split2[0], $split2[1], $split1[0], $split1[1]);

                    if (floatval($jml) == 0) {
                        $geser = "-";
                        $jarakGeser = "-";
                      }
                      else if (floatval($jml) <= 89 && floatval($jml) >= 1) {
                        $geser = "Ya";
                        $jarakGeser = floatval($jml);
                      } else if (str_contains($request->nama , "000")) {
                        $geser = "Tidak";
                        $jarakGeser = "0";
                      } else if (floatval($jml) >= 90 && floatval($jml) <= 110) {
                        $geser = "Tidak";
                        $jarakGeser = floatval($jml);
                      } else if (floatval($jml) >= 190 && floatval($jml) <= 210) {
                        $geser = "Tidak";
                        $jarakGeser = floatval($jml);
                      } else if (floatval($jml) >= 290 && floatval($jml) <= 310) {
                        $geser = "Tidak";
                        $jarakGeser = floatval($jml);
                      } else if (floatval($jml) >= 390 && floatval($jml) <= 410) {
                        $geser = "Tidak";
                        $jarakGeser = floatval($jml);
                      } else if (floatval($jml) >= 490 && floatval($jml) <= 510) {
                        $geser = "Tidak";
                        $jarakGeser = floatval($jml);
                      } else if (floatval($jml) >= 590 && floatval($jml) <= 610) {
                        $geser = "Tidak";
                        $jarakGeser = floatval($jml);
                      } else if (floatval($jml) >= 690 && floatval($jml) <= 710) {
                        $geser = "Tidak";
                        $jarakGeser = floatval($jml);
                      } else if (floatval($jml) >= 790 && floatval($jml) <= 810) {
                        $geser = "Tidak";
                        $jarakGeser = floatval($jml);
                      } else if (floatval($jml) >= 890 && floatval($jml) <= 910) {
                        $geser = "Tidak";
                        $jarakGeser = floatval($jml);
                      } else if (floatval($jml) >= 111 && floatval($jml) <= 1900) {
                        $geser = "Ya";
                        $jarakGeser = floatval($jml);
                      } else {
                        $geser = "Ya";
                        $jarakGeser = floatval($jml);
                      }
                }elseif($request->kategori_id == "2" && sizeof($detail_patok) == 0){
                    $jml = "-";
                    $geser = "-";
                }

                $patok = Patok::where('id', $request->id)->update([
                    'kategori_id' => $request->kategori_id,
                    'image_id' => $idImages,
                    'id_user' => auth('api')->user()->id,
                    'nama' => $request->nama,
                    'nilai_km' => $request->nilai_km,
                    'nilai_hm' => $request->nilai_hm,
                    'wilayah' => $request->wilayah,
                    'ruas_jalan' => $request->ruas_jalan,
                    'hilang' => $request->hilang,
                    'rusak' => $request->rusak,
                    'terhalang' => $request->terhalang,
                    'geser' => $geser,
                    'status_geser' => $jml,
                    'deskripsi' => $request->deskripsi,
                    'latlng' => $request->latlng
                ]);
            }

            return response()->json([
                'success' => true,
                'pesan' => 'Patok Berhasil Diubah',
            ], 200);
        }

    }

    public function ruas_jalan()
    {
        $data = RuasJalan::all();
        return response()->json([
            'success' => true,
            'pesan' => 'List Ruas Jalan',
            'data' => $data
        ], 200);
    }



    public function patok_last(Request $request)
    {
        $id_user = auth('api')->user()->id;

        // $patok = DB::table('patok')
        // ->join("images", "patok.image_id", "=", "images.id")
        // ->join("kategori", "kategori.id", "=", "patok.kategori_id")
        // ->join("users", "users.id", "=" , "patok.id_user")
        // ->select("patok.id","patok.nama as nama_patok", "kategori.nama as nama_kategori", "users.nama as nama_user"
        // ,"patok.ruas_jalan", "patok.wilayah", "patok.rusak", "patok.hilang", "patok.geser", "patok.terhalang",
        // "images.path as path", "images.path_new as path_new", "patok.status", "patok.status_geser", "patok.created_at")
        // ->paginate($request->limit);

        $detail_patok = Patok::select('id', 'kategori_id', 'ruas_jalan', 'nilai_km', 'nilai_hm', 'latlng', 'created_at')
        ->where('ruas_jalan', $request->ruas_jalan)
        ->where('nilai_km', $request->nilai_km)
        ->where('kategori_id', 1)->get();

        // ->orderBy('id', 'ASC')->first();


        return response()->json([
            'success' => true,
            // 'pesan' => 'Lowongan Perbulan ' . $request->limit . ' Data',
            // 'lowongan' => LowonganResource::collection($lowongan)
            'data' => $detail_patok
        ], 200);
    }

    public function patok_delete(Request $request)
    {

        if(empty(@response()->json(auth('api')->user())->original->id)){
            return response()->json([
                'success' => false,
                'pesan' => 'Silahkan login kembali',
                'data' => null
            ], 200);
        }else{
            $data_patok = Patok::where('id', $request->id)->with('image')->first();
            $idImages = $data_patok['image']->id;

            $path = $data_patok['image']->path;
            $files = substr($path, 1);
            File::delete($files);
            Images::where('id', $idImages)->delete();
            Patok::where('id', $request->id)->delete();



            return response()->json([
                'success' => true,
                'pesan' => 'Patok Berhasil Dihapus',
            ], 200);
        }

    }

    public function patok_history(Request $request)
    {

        $id_user = auth('api')->user()->id;

        $now = Carbon::now();

        $period = $request->period;


        $patok = DB::table('patok')
        ->join("images", "patok.image_id", "=", "images.id")
        ->join("kategori", "kategori.id", "=", "patok.kategori_id")
        ->join("users", "users.id", "=" , "patok.id_user")
        ->where("users.id", "=", $id_user)
        ->where('patok.created_at', '>', now()->subDays($request->period)->endOfDay())
        ->orderBy('patok.id', 'DESC')
        ->select("patok.id","patok.nama as nama_patok", "kategori.nama as nama_kategori"
        ,"patok.ruas_jalan", "patok.wilayah", "patok.rusak", "patok.hilang", "patok.geser", "patok.terhalang", "patok.created_at")->get();


        // $patok = $patok ->paginate(6, ['*'], 'page', $request->page);

        return response()->json([
            'success' => true,
            // 'pesan' => 'Lowongan Perbulan ' . $request->limit . ' Data',
            // 'lowongan' => LowonganResource::collection($lowongan)
            'data' => $patok
        ], 200);
    }

    public function edit_user(Request $request){
        if(empty(@response()->json(auth('api')->user())->original->id)){
            return response()->json([
                'success' => false,
                'pesan' => 'Silahkan login kembali',
                'data' => null
            ], 200);
        } else {
        $user = User::findOrFail(auth('api')->user()->id);

        $users = User::where('id', auth('api')->user()->id)->update([
            'nama' => $request->nama,
            'email' => $request->email,
            'no_hp' => $request->no_hp
        ]);

        if(!empty($request->new_password)){
        if (Hash::check($request->password, $user->password)) {
                    $user->fill([
                    'password' => Hash::make($request->new_password)
        ])->save();


        } else {

        return response()->json([
            'success' => false,
            'pesan' => 'Password Salah ',
        ], 200);

        }
        }


        return response()->json([
            'success' => true,
            'pesan' => 'Berhasil Mengubah Profil',
        ], 200);


    }
    }

    public function me() {
        $user = User::find(@response()->json(auth('api')->user())->original->id);


        return response()->json([
            'success' => true,
            'data' => $user,
            'pesan' => 'Berhasil mendapatkan Profil',
        ], 200);
    }



    // public function haversine(Request $request)
    // {
        // $id_user = auth('api')->user()->id;


       public function haversine($id,$lat1, $lon1, $lat2, $lon2){

            $d = 0.017453292519943295;

            $lati1 = $lat1 * $d;
            $long1 = $lon1 * $d;
            $lati2 = $lat2 * $d;
            $long2 = $lon2 * $d;

            $clat = ($lati2) - ($lati1);
            $clon = ($long2) - ($long1);

            $a = pow(sin($clat / 2), 2) +
            (cos($lati1) * cos($lati2) * pow(sin($clon / 2), 2));

            $c = 2 * asin(sqrt($a));

            $meter = (6371 * $c) * 1000;

            $jml = number_format($meter, 2);


            if (floatval($jml) == 0) {
                $geser = "-";
             }
              else if (floatval($jml) <= 89 && floatval($jml) >= 1) {
                $geser = "Ya";
            } else if (floatval($jml) >= 90 && floatval($jml) <= 110) {
                $geser = "Tidak";
              } else if (floatval($jml) >= 290 && floatval($jml) <= 310) {
                $geser = "Tidak";
              } else if (floatval($jml) >= 390 && floatval($jml) <= 410) {
                $geser = "Tidak";
              } else if (floatval($jml) >= 490 && floatval($jml) <= 510) {
                $geser = "Tidak";
              } else if (floatval($jml) >= 590 && floatval($jml) <= 610) {
                $geser = "Tidak";
              } else if (floatval($jml) >= 690 && floatval($jml) <= 710) {
                $geser = "Tidak";
              } else if (floatval($jml) >= 790 && floatval($jml) <= 810) {
                $geser = "Tidak";
              } else if (floatval($jml) >= 890 && floatval($jml) <= 910) {
                $geser = "Tidak";
              } else if (floatval($jml) >= 111 && floatval($jml) <= 1900) {
                $geser = "Ya";
              } else {
                $geser = "Ya";
              }
            // return $meter;

            $patok = Patok::where('id', $id)->update([
                'geser' =>  $geser,
                'status_geser' => $jml,
            ]);

        // return response()->json([
        //     'success' => true,
        //     'data' => $meter,
        //     'pesan' => 'Berhasil hitung haversine',
        // ], 200);

        }


        public function fillHaversine($lat1, $lon1, $lat2, $lon2){

            $d = 0.017453292519943295;

            $lati1 = $lat1 * $d;
            $long1 = $lon1 * $d;
            $lati2 = $lat2 * $d;
            $long2 = $lon2 * $d;

            $clat = ($lati2) - ($lati1);
            $clon = ($long2) - ($long1);

            $a = pow(sin($clat / 2), 2) +
            (cos($lati1) * cos($lati2) * pow(sin($clon / 2), 2));

            $c = 2 * asin(sqrt($a));

            $meter = (6371 * $c) * 1000;

            $numberAsString = number_format($meter, 2);
            return $numberAsString;



        }

        public function patok_map(Request $request)
        {
            $id_user = auth('api')->user()->id;
            $filter = $request->get("filter");

            // $patok = DB::table('patok')->select('id', 'nama', 'latlng', 'ruas_jalan')->orderBy("id", "ASC")->get();
            $patok = Patok::query();


            if(!empty($filter)){
                $patok->where(DB::raw('lower(ruas_jalan)'), strtolower($filter));
            }

            $patok = $patok->select('id', 'nama', 'latlng', 'ruas_jalan', 'rusak', 'terhalang','geser', 'hilang')->get();

            foreach($patok as $p){
                $latlng = $p->latlng;
                $split = explode(',', $latlng);
                $p->lat = doubleval($split[0]);
                $p->long = doubleval($split[1]);
                if($p->rusak == "Tidak" && $p->terhalang == "Tidak" && $p->geser == "Tidak" && $p->hilang =="Tidak" ){
                    $p->kondisi = "Patok Ideal";
                }else{
                    $p->kondisi = "Patok Bermasalah";
                }
                $p->makeHidden('kategori', 'latlng', 'rusak', 'terhalang','geser', 'hilang');

            }





            // $detail_patok = Patok::select('id', 'kategori_id', 'ruas_jalan', 'nilai_km', 'nilai_hm', 'latlng', 'created_at')
            // ->where('ruas_jalan', $request->ruas_jalan)
            // ->where('nilai_km', $request->nilai_km)
            // ->where('kategori_id', 1)->get();

            // if(!empty($search)){
            //     $patok = $patok->where(function ($query) use ($request) {
            //         $query->where('patok.nama', 'ilike', '%'.$request->search.'%')
            //         ->orWhere('kategori.nama', 'ilike', '%'.$request->search.'%')
            //         ->orWhere('patok.ruas_jalan', 'ilike', '%'.$request->search.'%')
            //         ->orWhere('patok.wilayah', 'ilike', '%'.$request->search.'%')
            //         ->orWhere('patok.status', 'ilike', '%'.$request->search.'%')
            //         ->orWhere(DB::raw('patok.created_at::text'), 'ilike', '%'.$request->search.'%')
            //         ;
            //     });
            // }
            // if(!empty($kategori)){
            //     $patok = $patok->where(DB::raw('lower(kategori.nama)'), strtolower($kategori));

            // }
            // if(!empty($wilayah)){
            //     $patok = $patok->where(DB::raw('lower(patok.wilayah)'), strtolower($wilayah));
            // }
            // if(!empty($ruas_jalan)){
            //     $patok = $patok->where(DB::raw('lower(patok.ruas_jalan)'), strtolower($ruas_jalan));
            // }
            // if(!empty($rusak)){
            //     $patok = $patok->where(DB::raw('lower(patok.rusak)'), strtolower($rusak));
            // }
            // if(!empty($hilang)){
            //     $patok = $patok->where(DB::raw('lower(patok.hilang)'), strtolower($hilang));

            // }
            // if(!empty($terhalang)){
            //     $patok = $patok->where(DB::raw('lower(patok.terhalang)'), strtolower($terhalang));
            // }
            // if(!empty($geser)){
            //     $patok = $patok->where(DB::raw('lower(patok.geser)'), strtolower($geser));
            // }
            // if(!empty($status)){
            //     $patok = $patok->where(DB::raw('lower(patok.status)'), strtolower($status));
            // }


            // $patok = $patok ->paginate(6, ['*'], 'page', $request->page);

            return response()->json([
                'success' => true,
                // 'pesan' => 'Lowongan Perbulan ' . $request->limit . ' Data',
                // 'lowongan' => LowonganResource::collection($lowongan)
                'data' => $patok
            ], 200);
        }


        // $cal = calculate(-7.1590603, 111.8797438, -7.15649, 111.8740624);


        // print(long2);


}
