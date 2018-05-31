import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from "react-alert";

import AlertTemplate from "./components/alert-template";
import ContactsIndex from './components/contacts-index';
import ContactsNew from './components/contacts-new';
import ContactsShow from './components/contacts-show';
import ContactsEdit from './components/contacts-edit';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const alertOptions = {
	timeout: 5000,
	position: "bottom center"
};

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<AlertProvider template={AlertTemplate} {...alertOptions}>
			<BrowserRouter>
				<div>
					<Switch>
						<Route path="/contacts/edit/:id" component={ContactsEdit}/>
						<Route path="/contacts/new" component={ContactsNew}/>
						<Route path="/contacts/:id" component={ContactsShow}/>
						<Route path="/" component={ContactsIndex} />
					</Switch>
				</div>
			</BrowserRouter>
		</AlertProvider>
	</Provider>
	, document.getElementById('app'));
