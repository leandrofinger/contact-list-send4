import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ContactsReducer from './contacts-reducers';

const rootReducer = combineReducers({
  contacts: ContactsReducer,
  form: formReducer
});

export default rootReducer;
