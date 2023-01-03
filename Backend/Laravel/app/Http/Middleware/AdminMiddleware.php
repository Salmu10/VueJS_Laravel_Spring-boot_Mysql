<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware {

    public function handle(Request $request, Closure $next) {
        try {
            if (auth()->check() && auth()->user()->type != "admin") {
                return response()->json([ "error" => "Unauthorized" ], 401);
            }
            return $next($request);
        } catch (\Throwable $th) {
            return response()->json([ "error" => "Unauthorized" ], 401);
        }
    }
}
