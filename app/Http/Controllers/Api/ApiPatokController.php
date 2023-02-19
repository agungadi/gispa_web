<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patok;
use Illuminate\Http\Request;
use DB;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class ApiPatokController extends Controller
{
    //
    public function patok_limit(Request $request)
    {
        $patok = DB::table('patok')
        ->join("images", "patok.image_id", "=", "images.id")
        ->join("kategori", "kategori.id", "=", "patok.kategori_id")
        ->join("users", "users.id", "=" , "patok.id_user")
        ->select("patok.nama as nama_patok", "kategori.nama as nama_kategori", "users.nama as nama_user"
        ,"patok.ruas_jalan", "patok.wilayah", "patok.rusak", "patok.hilang", "patok.geser", "patok.terhalang",
        "images.path as path", "images.path_new as path_new", "patok.status", "patok.status_geser")
        ->paginate($request->limit);

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
            'pesan' => 'Lowongan Perbulan ' . $request->limit . ' Data',
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
            $query->where('patok.patok', 'ILIKE', '%' . $rusak . '%');
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
}
