<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContacts extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
			'email' => 'required|email|max:255|unique:contacts,email,' . $this->route('contact')->id,
			'first_name' => 'required|max:50',
			'last_name' => 'required|max:50',
			'phone' => 'required|max:15'
        ];
    }
}
