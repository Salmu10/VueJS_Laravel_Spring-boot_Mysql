<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUserRequest extends FormRequest {
    
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
            'type' => 'sometimes',
            'image' => 'sometimes',
            'is_active' => 'sometimes',
        ];
    }

    public function withValidator($validator) {
        if ($validator->fails()) {
            throw new HttpResponseException(response()->json([
                'msg' => 'Se deben introducir todos los campos para crear un user',
                'status' => false,
                'errors' => $validator->errors(),
            ], 400));
       }
    }
}
