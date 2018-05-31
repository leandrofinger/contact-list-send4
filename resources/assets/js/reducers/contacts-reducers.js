import _ from 'lodash';

import { FETCH_CONTACTS, FETCH_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case UPDATE_CONTACT:
			const newState = _.remove(state, (contact) => contact.id === action.payload.id);
			return { ...newState, [action.payload.data.id]: action.payload.data };
		case DELETE_CONTACT:
			return _.omit(state, action.payload);
		case FETCH_CONTACT:
			return { ...state, [action.payload.data.id]: action.payload.data };
		case FETCH_CONTACTS:
			return _.mapKeys(action.payload.data, 'id');
		default:
			return state;
	}
}
