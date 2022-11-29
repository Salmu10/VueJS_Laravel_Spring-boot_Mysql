<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTableRequest extends FormRequest {
    
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'table_name' => 'sometimes',
            'capacity' => 'sometimes',
            'available' => 'sometimes',
            'image' => 'sometimes',
            'categories' => 'sometimes', 'array:name,categories',
        ];
    }
}
