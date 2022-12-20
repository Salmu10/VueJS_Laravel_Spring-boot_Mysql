<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest {
    
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
            'type' => 'optional',
            'image' => 'optional',
            'is_active' => 'required',
        ];
    }
}
