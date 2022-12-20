<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index() {
        return UserResource::collection(User::get());
    }

    public function store(StoreUserRequest $request) {
        return UserResource::make(User::create($request->validated()));
    }

    public function show($id) {
        return UserResource::make(User::where('id', $id)->firstOrFail());
    }

    public function update(Request $request, $id) {
        $update = User::where('id', $id)->update($request->validated());
        
        if ($update == 1) {
            return response()->json([ "Message" => "Updated correctly" ]);
        } else {
            return response()->json([ "Status" => "Not found" ], 404);
        };
    }

    public function destroy($id) {
        $delete = User::where('id', $id)->delete();

        if ($delete == 1) {
            return response()->json([ "Message" => "Deleted correctly" ], 200);
        } else {
            return response()->json([ "Status" => "Not found" ], 404);
        }
    }

}