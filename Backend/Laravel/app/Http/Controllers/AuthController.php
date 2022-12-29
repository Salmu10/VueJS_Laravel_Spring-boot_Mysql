<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {

    protected User $user;

    public function __construct(User $user) {
        $this->user = $user;
    }

    public function index() {
        return UserResource::collection(User::get());
    }

    public function store(StoreUserRequest $request) {
        $email_exist = User::where('email', $request->validated()['email'])->get()->count();
        $user_exist = User::where('username', $request->validated()['username'])->get()->count();

        if ($email_exist === 1) {
            return response()->json([ "Status" => "Email is already in use" ], 400);
        } else if ($user_exist === 1) {
            return response()->json([ "Status" => "Username already exists" ], 400);
        }

        $user = $this->user->create($request->validated());
        return UserResource::make($user);
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
            return response()->json([ "Status" => "User not found" ], 404);
        }
    }

    public function login(UserLoginRequest $request) {
        
        $token = Auth::attempt($request->validated());

        if (!$token) {
            return response()->json([ "error" => "Unauthorized" ], 400);
        }

        if (auth()->user()->type != "admin") {
            return response()->json([ "error" => "Unauthorized" ], 400);
        }

        return response()->json(['token' => $token, 'user' => UserResource::make(auth()->user())]);
    }

    public function register(StoreUserRequest $request) {

        $email_exist = User::where('email', $request->validated()['email'])->get()->count();
        $user_exist = User::where('username', $request->validated()['username'])->get()->count();

        if ($email_exist === 1) {
            return response()->json([ "Status" => "Email is already in use" ], 400);
        } else if ($user_exist === 1) {
            return response()->json([ "Status" => "Username already exists" ], 400);
        }

        $user = $this->user->create($request->validated());
        return UserResource::make($user);
    }

    public function logout() {

        try {
            Auth::logout();
            return response()->json(['message' => 'Successfully logout']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'logout error'], 500);
        }
    }

}