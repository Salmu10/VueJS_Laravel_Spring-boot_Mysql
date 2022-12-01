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

        return [
            'id' => $this->id,
            'table_name' => $this->table_name,
            'capacity' => $this->capacity,
            'available' => $this->available,
            'image' => $this->image,
            'categories' => $categories
        ];
    }
}