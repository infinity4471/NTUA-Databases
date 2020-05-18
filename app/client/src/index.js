import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components';
import * as serviceWorker from './serviceWorker';
import {Socket} from './components/connector';

Socket.on( 'STORE_ADDRESSES', data => {
	var addresses = []
	for( var i = 0; i < data.length; i++ ) {
		addresses.push( data[ i ][ "address" ] );
	}
	ReactDOM.render(
		<App addresses={addresses}/>,
		document.getElementById('root')
	);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
