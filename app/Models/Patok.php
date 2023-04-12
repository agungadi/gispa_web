<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;

class Patok extends Model
{
    use HasFactory;
    protected $table = 'patok';

    protected $with = array('kategori');

    protected $fillable = [
        'kategori_id',
        'image_id',
        'id_user',
        'nama',
        'nilai_km',
        'nilai_hm',
        'wilayah',
        'ruas_jalan',
        'hilang',
        'rusak',
        'terhalang',
        'geser',
        'status_geser',
        'status',
        'deskripsi',
        'latlng',
        'longlat',
        'p_longlat',
        'periode'
    ];


    protected $spatialFields = [
        'p_longlat'
    ];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(kategori::class, 'kategori_id');
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Images::class, 'image_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
