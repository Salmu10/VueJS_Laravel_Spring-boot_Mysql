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
            'image' =>  isset($fields['image']) ? $fields['image'] : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
            'is_active' =>  isset($fields['is_active']) ? $fields['is_active'] : true, //CHANGE TO FALSE, TRUE ONLY FOR TESTING
        ]);
    } 

    //https://avatars.dicebear.com/api/adventurer/salmu10.svg

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

}
