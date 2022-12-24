<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTableRequest extends FormRequest {
    
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'table_name' => 'required',
            'capacity' => 'required',
            'available' => 'required',
            'image' => 'required',
            'categories' => 'required', 'array:name,categories',
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
