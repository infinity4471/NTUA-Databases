import React from 'react';
import {StoreSelector, ClientSelector} from './MenuSelector';
import {Socket} from './connector';


const App = ({addresses}) => {
	var stores = addresses;
	var clients = [];
	return (
		<div id="App">
			<StoreSelector items={stores}/>
			<ClientSelector items={clients}/>
		</div>
	);
}

export default App;
