<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RuasJalan extends Model
{
    use HasFactory;

    protected $table = 'ruasjalan';

    protected $fillable = [
        'nama',
        'wilayah',
        'kode',
        'panjang',
        'active'
    ];
}
