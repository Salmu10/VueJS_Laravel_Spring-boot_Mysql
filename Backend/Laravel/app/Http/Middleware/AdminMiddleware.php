<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware {

    public function handle(Request $request, Closure $next) {
        try {
            // error_log(json_encode(auth()->user()));
            if (auth()->user() == null || auth()->user()->type != "admin") {
                return response()->json([ "error" => "Unauthorized" ], 401);
            }
            return $next($request);
        } catch (\Throwable $th) {
            return response()->json([ "error" => "Unauthorized" ], 401);
        }
    }
}
