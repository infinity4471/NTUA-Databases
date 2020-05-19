import React, { Component } from 'react';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import {ClientTable} from './Grids';
import io from 'socket.io-client';

import '@progress/kendo-theme-default/dist/all.css'

const url = "http://localhost:8000"

function StoreSelector( {items,grid_data} ) {
	const [state, setState] = React.useState({item: undefined, open: false, data: grid_data, grid: null})
	const handleChange = (event) => {
		setState({ ...state, open: true })
		setState({ ...state, item: event.target.value })
		setState({ ...state, grid: ( <ClientTable columnData={state.data}/> ) })	
	}
	return (
		<div className="Selector">
		<h1> Επιλογή Καταστήματος </h1>
		<ComboBox data={items} onChange={handleChange} />
		{state.grid}
		</div>
        );
}

function ClientSelector( {items,grid_data} ) {
	const [state, setState] = React.useState({item: undefined, open: false, data: grid_data, grid: null})
	let socket = io( url )
	socket.on('CUSTOMER_DATA', data => {
		state.data = data;
		setState({ ...state, grid: ( <ClientTable columnData={state.data}/> ) })
	});
	const handleChange = (event) => {
		setState({ ...state, open: true })
		setState({ ...state, item: event.target.value })	
		socket.emit( 'SELECT_CUSTOMER', event.target.value )
	}
	return (
		<div className="Selector">
		<h1> Επιλογή Πελάτη </h1>
		<ComboBox data={items} onChange={handleChange} />            
		{state.grid}
		</div>
        );
}

export { StoreSelector, ClientSelector };
