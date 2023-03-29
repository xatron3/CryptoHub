<?php

namespace App\Http\Controllers\Api;

use App\Models\Note;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class NotesController extends Controller
{
  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'title' => 'required',
    ]);

    if ($validator->fails()) {
      return response()->json(['message' => 'Fill all fields', 'status' => 400], 200);
    }

    $note = new Note();
    $note->title = $request->title;
    $note->description = $request->description;
    $note->content = $request->content;
    $note->user_id = $request->user()->id;
    $note->save();

    return response()->json(['message' => 'Note was created', 'status' => 200], 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Event  $event
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request)
  {
    $note = Note::where('id', $request->id)->first();

    if (!$note) {
      return response()->json(['message' => 'Note was not found', 'status' => 400], 200);
    }

    $note->content = $request->content;
    $note->save();
    return response()->json(['message' => 'Note was updated', 'status' => 200], 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Event  $event
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request)
  {
    $note = Note::where('id', $request->id)->first();

    if (!$note) {
      return response()->json(['message' => 'Note was not found', 'status' => 400], 200);
    }

    $note->delete();
    return response()->json(['message' => 'Note was deleted', 'status' => 200], 200);
  }
}
