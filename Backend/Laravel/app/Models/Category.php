<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Table;

class Category extends Model {

    use HasFactory;

    protected $fillable = ['category_name', 'image'];

    public function tables(): BelongsToMany {
        return $this->belongsToMany(Table::class, 'categories_tables', 'id_category', 'id_table');
    }
}