<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Category;

class Table extends Model {
    use HasFactory;

    protected $fillable = ['table_name', 'capacity', 'available', 'image'];

    public function categories(): BelongsToMany {
        return $this->belongsToMany(Category::class, 'categories_tables', 'id_table', 'id_category');
    }
}
