<?php

namespace App\Http\Controllers\Api;

use App\Models\BlogPosts;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;

class BlogPostController extends Controller
{
  public function store(Request $request)
  {
    $post = new BlogPosts();
    $post->title = $request->title;
    $post->slug = $request->slug;
    $post->content = $request->content;
    $post->user_id = $request->user()->id;
    $post->save();
  }

  public function get(Request $request = null)
  {
    $posts = BlogPosts::all()->sortByDesc("id");

    return BlogPostResource::collection($posts);
  }
}
