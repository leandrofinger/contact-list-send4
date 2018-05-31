<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Http\Requests\StoreContacts;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('json', ['data' => Contact::all()]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreContacts  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreContacts $request)
    {
        $validated = $request->validated();

        $contact = new Contact();
        $contact->fill($validated);
        $contact->save();

        return view('json', ['data' => $contact]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        return view('json', ['data' => $contact]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\StoreContacts  $request
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreContacts $request, $id)
    {
    	$validated = $request->validated();
		$contact = Contact::find($id)->first();
		$contact->fill($validated);
		$contact->save();

		return view('json', ['data' => $contact]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
    	$response = ($contact->delete()) ? true : false;

		return view('json', ['data' => $response]);
    }
}
