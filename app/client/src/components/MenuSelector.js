import React from 'react';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import {ClientTable, ProductTable} from './Grids';
import io from 'socket.io-client';

import '@progress/kendo-theme-default/dist/all.css'

const url = "http://localhost:8000"

const StoreSelector = () => {
	const [state, setState] = React.useState({
		item: undefined, 
		open: true, 
		data: [], 
		socket: io( url ), 
		grid: <ProductTable/>,
		comboBox: <ComboBox/>
	});
	const handleChange = (event) => {
		setState({ ...state, item: event.target.value })
		setState({ ...state, grid: ( <ProductTable columnData={state.data}/> ) })	
	}
	state.socket.on('ALL_TRANSACTIONS', transaction_data => {
		setState({ ...state, data: transaction_data })
		setState({ ...state, grid: ( <ProductTable columnData={transaction_data}/> ) })	
	});
	state.socket.on('STORE_ADDRESSES', data => {
		setState({ ...state, comboBox: ( <ComboBox data={data} onChange={handleChange}/> ) })	
	});
	return (
		<div className="Selector">
		<h1> Επιλογή Καταστήματος </h1>
		{state.comboBox}
		{state.grid}
		</div>
        );
}

const ClientSelector = () => {
	const [state, setState] = React.useState({
		item: undefined, 
		open: true, 
		data: [], 
		socket: io( url ), 
		grid: <ClientTable/>,
		comboBox: <ComboBox/>
	});
	const handleChange = (event) => {
		setState({ ...state, open: true })
		setState({ ...state, item: event.target.value })	
		state.socket.emit( 'SELECT_CUSTOMER', event.target.value )
	}
	state.socket.on('CUSTOMER_NAMES', data => {
		setState({ ...state, comboBox: ( <ComboBox data={data} onChange={handleChange}/> ) })
	});
	state.socket.on('CUSTOMER_DATA', data => {
		state.data = data;
		setState({ ...state, grid: ( <ClientTable columnData={state.data}/> ) })
	});
	return (
		<div className="Selector">
		<h1> Επιλογή Πελάτη </h1>
		{state.comboBox}
		{state.grid}
		</div>
        );
}

export { StoreSelector, ClientSelector };
