<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JWTMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    try {
      $user = JWTAuth::parseToken()->authenticate();
    } catch (Exception $e) {
      if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
        return response()->json(['status' => 'Token is Invalid']);
      } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
        // $newToken = JWTAuth::parseToken()->refresh();
        return response()->json(['token' => 'Token expired']);
      } else {
        return response()->json(['status' => 'Authorization Token not found']);
      }
    }
    return $next($request);
  }
}