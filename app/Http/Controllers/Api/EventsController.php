<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;

class EventsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $event = new Event();
        $event->title = $request->title;
        $event->description = $request->description ? $request->description : null;
        $event->start_date = $request->start_date;
        $event->end_date = $request->end_date ? $request->end_date : null;
        $event->save();

        return response()->json(['message' => 'Event was created'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {
        $limit = $request->limit ? $request->limit : 1000;
        $passed = isset($request->passed) ? '<' : null;

        if ($request->passed) {
            $event = Event::limit($limit)->orderBy('start_date')->whereDate('start_date', $passed, now())->get();
        } else {
            $event = Event::limit($limit)->orderBy('start_date')->get();
        }

        return EventResource::collection($event);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $event = Event::where('id', $request->id)->first();

        if ($event) {
            $event->delete();
            return 'Done';
        } else {
            return 'Not found';
        }
    }
}