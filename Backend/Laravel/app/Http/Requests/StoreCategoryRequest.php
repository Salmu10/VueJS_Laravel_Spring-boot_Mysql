<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreCategoryRequest extends FormRequest {
    
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'category_name' => 'required',
            'image' => 'required',
        ];
    }

    public function withValidator($validator) {
        if ($validator->fails()) {
            throw new HttpResponseException(response()->json([
                'msg'    => 'Se deben introducir todos los campos para crear una mesa',
                'status' => false,
                'errors' => $validator->errors(),
            ], 400));
       }
    }

}