<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateReserveRequest;
use App\Http\Requests\StoreReserveRequest;
use App\Http\Resources\ReserveResource;
use App\Models\Table;
use App\Models\Reserve;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Integer;

class ReserveController extends Controller {

    public function index() {
        return ReserveResource::collection(Reserve::all());
    }

    public function store(StoreReserveRequest $request) {
        return ReserveResource::make(Reserve::create($request->validated()));
    }

    public function show($id) {
        return ReserveResource::make(Reserve::where('id', $id)->firstOrFail());
    }

    public function update(UpdateReserveRequest $request, $id) {
        return response()->json(Reserve::where('id', $id)->update($request->validated()));
    }

    public function destroy($id) {
        $delete = Reserve::where('id', $id)->delete();

        if ($delete == 1) {
            return response()->json([ "Message" => "Deleted correctly" ], 200);
        } else {
            return response()->json([ "Status" => "Not found" ], 404);
        }
    }
}
