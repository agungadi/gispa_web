<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kategori extends Model
{
    use HasFactory;
    protected $table = 'kategori';

    public function patok():HasMany
    {
        return $this->hasMany(Patok::class, 'kategori_id');
    }
}
