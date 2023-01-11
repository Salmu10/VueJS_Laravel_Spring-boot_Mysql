<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TableResource extends JsonResource {

    public function toArray($request) {
        $categories = [];
        foreach ($this->categories as $cat) {
            $category = [
                "id" => $cat->id,
                "category_name" => $cat->category_name,
                "image" => $cat->image
            ];
            array_push($categories, $category);
        }

        $reserves = [];
        foreach ($this->reserves as $res) {
            $reserve = [
                "id" => $res->id,
                "id_user" => $res->id_user,
                "id_table" => $res->id_table,
                "reserve_date" => $res->reserve_date,
                "reserve_type" => $res->reserve_type,
                "capacity" => $res->capacity,
                "confirmed" => $res->confirmed,
            ];
            array_push($reserves, $reserve);
        }

        return [
            'id' => $this->id,
            'table_name' => $this->table_name,
            'capacity' => $this->capacity,
            'available' => $this->available,
            'image' => $this->image,
            'categories' => $categories,
            'reserves' => $reserves
        ];
    }
}