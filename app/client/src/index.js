import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer, socketMiddleware } from './reducers';
import {updateCustomers} from './actions/customerActions';

const url = "http://localhost:8000"

const store = createStore( 
	rootReducer,
	applyMiddleware( socketMiddleware( url ) )
);

ReactDOM.render(
	<Provider store={store}>
		<App />
  	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
