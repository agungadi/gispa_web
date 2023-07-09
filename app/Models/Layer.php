<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Geografis;

class Layer extends Model
{
    use HasFactory;

    protected $table = 'layer';

    protected $with = array('geografis');

    public function geografis(): BelongsTo
    {
        return $this->belongsTo(geografis::class, 'geografis_id');
    }


}
