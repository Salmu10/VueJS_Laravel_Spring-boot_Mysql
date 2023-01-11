<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reserve extends Model  {

    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_table',
        'reserve_date',
        'reserve_type',
        'capacity',
        'confirmed'
    ];

    public $timestamps = false;

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function table() {
        return $this->belongsTo(Table::class);
    }
}
