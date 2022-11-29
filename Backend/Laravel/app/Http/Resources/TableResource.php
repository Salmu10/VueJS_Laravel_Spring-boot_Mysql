<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TableResource extends JsonResource {

    public function toArray($request) {
        return [
            'id' => $this->id,
            'table_name' => $this->table_name,
            'capacity' => $this->capacity,
            'available' => $this->available,
            'image' => $this->image,
        ];
    }
}
