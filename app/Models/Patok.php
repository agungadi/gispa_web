<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Patok extends Model
{
    use HasFactory;
    protected $table = 'patok';

    protected $with = array('kategori');

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
