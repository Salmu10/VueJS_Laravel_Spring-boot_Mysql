<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Mesa;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model {

    use HasFactory;

    protected $fillable = ['category_name', 'image'];

    public function tables(): BelongsToMany {
        return $this->belongsToMany(Mesa::class, 'categories_tables', 'id_category', 'id_table');
    }
}