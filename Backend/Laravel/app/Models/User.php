<?php

namespace App\Models;

use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject {

    use HasFactory;

    protected $fillable = ['username', 'email', 'password', 'type', 'image', 'is_active'];

    protected $hidden = ['password', 'created_at', 'updated_at'];

    public function create($fields) {
        return parent::create([
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'type' => isset($fields['type']) ? $fields['type'] : 'client',
            'image' =>  isset($fields['image']) ? $fields['image'] : 'https://avatars.dicebear.com/api/adventurer/'.$fields['username'].'.svg',
            'is_active' =>  isset($fields['is_active']) ? $fields['is_active'] : true,
        ]);
    } 

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

}
