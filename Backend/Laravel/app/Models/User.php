<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model {

    use HasFactory;

    protected $fillable = ['username', 'email', 'password', 'type', 'image', 'is_active'];

    protected $hidden = ['created_at', 'updated_at'];

    public function tables() {
        return $this->morphedByMany(Table::class, 'id_table');
    }
}
