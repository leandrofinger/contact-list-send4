import axios from 'axios';

export const FETCH_CONTACTS = 'fetch_contacts';
export const FETCH_CONTACT = 'fetch_contact';
export const CREATE_CONTACT = 'create_contact';
export const UPDATE_CONTACT = 'update_contact';
export const DELETE_CONTACT = 'delete_contact';

const API_BASE_PATH = '/api';

export function fetchContacts() {
	const request = axios.get(`${API_BASE_PATH}/contact`);

	return {
		type: FETCH_CONTACTS,
		payload: request
	};
}

export function createContact(values, callback) {
	const request = axios.post(`${API_BASE_PATH}/contact`, values)
		.then(() => callback());

	return {
		type: CREATE_CONTACT,
		payload: request
	};
}

export function updateContact(values, callback) {
	const request = axios.put(`${API_BASE_PATH}/contact/${values.id}`, values)
		.then(() => callback());

	return {
		type: UPDATE_CONTACT,
		payload: request
	}
}

export function fetchContact(id) {
	const request = axios.get(`${API_BASE_PATH}/contact/${id}`);

	return {
		type: FETCH_CONTACT,
		payload: request
	};
}

export function deleteContact(id, callback) {
	axios.delete(`${API_BASE_PATH}/contact/${id}`)
		.then(() => callback());

	return {
		type: DELETE_CONTACT,
		payload: id
	};
}