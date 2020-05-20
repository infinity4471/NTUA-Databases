import React from 'react';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import {ClientTable, ProductTable} from './Grids';
import io from 'socket.io-client';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@progress/kendo-theme-default/dist/all.css';

const url = "http://localhost:8000"

function fixDate( date ) {
	if( date === undefined ) return undefined;
	let myDate = date.getFullYear() + "-"
	var month = (date.getMonth() + 1)
	if( month < 10 ) myDate += "0";
	myDate += month + "-"
	var day = date.getDate();
	if( day < 10 ) myDate += "0";
	myDate += day
	return myDate
}

const TransactionSelector = () => {
	const [state, setState] = React.useState({
		store: undefined, 
		payment_method: undefined,
		date: undefined,
		category: undefined,
		transaction_data: [], 
		possible_payment_methods: [ '', 'Credit Card', 'Cash' ],
		names: [],
		socket: io( url )
	});
	const handleName = (event) => {
		setState({ ...state, store: event.target.value })
	}
	const handlePayment = (event) => {
		switch( event.target.value ) {
			case 'Credit Card':
				state.payment_method = 0
				break
			case 'Cash':
				state.payment_method = 1
				break
			default:
				state.payment_method = undefined
		}
		state.socket.emit('FETCH_TRANSACTIONS', ( { 'store': state.store, 
			'payment_method': state.payment_method,
			'Date_Time': fixDate( state.date ), 
			'category': state.category } ) )
	}
	const handleDate = (date) => {
		state.date = date
		state.socket.emit('FETCH_TRANSACTIONS', ( { 'store': state.store, 
			'payment_method': state.payment_method,
			'Date_Time': fixDate( state.date ), 
			'category': state.category } ) )
	}
	state.socket.on('TRANSACTION_DATA', data => {
		setState({ ...state, transaction_data: data })	
	});
	state.socket.on('STORE_ADDRESSES', data => {
		setState({ ...state, names: data })	
	});
	return (
		<div className="Selector">
		<h2> Επιλογή Καταστήματος </h2>
		<ComboBox data={state.names} onChange={handleName}/>
		<ComboBox data={state.possible_payment_methods} onChange={handlePayment}/>
		<DatePicker selected={state.date} onChange={handleDate}/>
		<ProductTable columnData={state.transaction_data}/>
		</div>
	);
}

const ClientSelector = () => {
	const [state, setState] = React.useState({
		item: undefined, 
		names: [], 
		customer_data: [],
		socket: io( url ),
		grid: <ClientTable/>,
		comboBox: <ComboBox/>
	});
	const handleName = (event) => {
		setState({ ...state, item: event.target.value })	
		state.socket.emit( 'SELECT_CUSTOMER', event.target.value )
	}
	state.socket.on('CUSTOMER_NAMES', data => {
		setState({...state, names: data})
	});
	state.socket.on('CUSTOMER_DATA', data => {
		console.log( state.item )
		console.log( data )
		setState({...state, customer_data: data})	
	});
	return (
		<div className="Selector">
		<h1> Επιλογή Πελάτη </h1>
		<ComboBox data={state.names} onChange={handleName}/>
		<ClientTable columnData={state.customer_data}/>
		</div>
	);
}

export { TransactionSelector, ClientSelector };
