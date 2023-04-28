<?php

namespace App\Http\Controllers\Api;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;

class BlogPostController extends Controller
{
  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $post = new BlogPost();
    $post->title = $request->title;
    $post->slug = $request->slug;
    $post->content = $request->content;
    $post->user_id = $request->user()->id;
    $post->save();

    return response()->json(['message' => 'Post was stored', 'data' => $post, 'status' => 200], 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request)
  {
    $post = BlogPost::where('id', $request->id)->first();

    if (!$post) {
      return response()->json(['message' => 'Post was not found', 'status' => 400], 200);
    }

    $post->title = $request->title;
    $post->content = $request->content;
    $post->save();

    return response()->json(['message' => 'Post was updated', 'status' => 200], 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request)
  {
    $post = BlogPost::where('id', $request->id)->first();

    if (!$post) {
      return response()->json(['message' => 'Post was not found', 'status' => 400], 200);
    }

    $post->delete();
    return response()->json(['message' => 'Post was deleted', 'status' => 200], 200);
  }

  public function get(Request $request = null)
  {
    $posts = BlogPost::all()->sortByDesc("id");

    return BlogPostResource::collection($posts);
  }
}
