<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReserveRequest extends FormRequest {

    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'reserve_date' => 'sometimes',
            'reserve_type' => 'sometimes',
            'capacity' => 'sometimes',
            'confirmed' => 'sometimes',
        ];
    }
}
