<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReserveRequest extends FormRequest {

    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            "id_table" => ["required"],
            "id_user" => ["required"],
            "reserve_date" => ["required"],
            "reserve_type" => ["required"],
            "capacity" => ["required"],
            "confirmed" => ["required"],
        ];
    }
}