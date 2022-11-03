<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
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
        return response()->json(['message' => 'Token is Invalid']);
      } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
        $newToken = JWTAuth::parseToken()->refresh();
        dd($newToken);
        return response()->json(['message' => 'Token Expired', 'token' => $newToken], 401);
      } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException) {
        return response()->json(['message' => 'Token blacklisted'], 500);
      } else {
        return response()->json(['message' => 'Authorization Token not found']);
      }
    }
    return $next($request);
  }
}