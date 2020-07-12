import React from 'react';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import {TransactionTable, ProductTable} from './Tables';
import io from 'socket.io-client';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@progress/kendo-theme-default/dist/all.css';

const url = "http://localhost:8000"

const socket = io( url )

function fixDate( date ) {
	if( date === undefined || date == null ) return undefined;
	let myDate = date.getFullYear() + "-"
	var month = (date.getMonth() + 1)
	if( month < 10 ) myDate += "0";
	myDate += month + "-"
	var day = date.getDate();
	if( day < 10 ) myDate += "0";
	myDate += day
	return myDate
}

class TransactionSelector extends React.Component {
	state = {
		store: undefined, 
		payment_method: undefined,
		date: undefined,
		category: undefined,
		transaction_data: [], 
		possible_payment_methods: [ '', 'Credit Card', 'Cash' ],
		names: []
	}
	constructor( props ) {
		super( props )
	}
	handleName = (event) => {
		this.state.store = event.target.value;
		socket.emit('FETCH_TRANSACTIONS', ( { 'store': this.state.store, 
			'payment_method': this.state.payment_method,
			'Date_Time': fixDate( this.state.date ), 
			'category': this.state.category } ) )
		socket.on('TRANSACTION_DATA', data => {
			this.setState({ transaction_data: data })	
		});
	}
	handlePayment = (event) => {
		switch( event.target.value ) {
			case 'Credit Card':
				this.state.payment_method = 0;
				break
			case 'Cash':
				this.state.payment_method = 1;
				break
			default:
				this.state.payment_method = undefined;
				break;
		}
		console.log( this.state.payment_method );
		socket.emit('FETCH_TRANSACTIONS', ( { 'store': this.state.store, 
			'payment_method': this.state.payment_method,
			'Date_Time': fixDate( this.state.date ), 
			'category': this.state.category } ) )
		socket.on('TRANSACTION_DATA', data => {
			this.setState( { transaction_data: [] } )
			this.setState({ transaction_data: data })	
		});
	}
	handleDate = (date) => {
		this.state.date = date
		console.log( this.state.date );
		console.log( "DAD" );
		socket.emit('FETCH_TRANSACTIONS', ( { 'store': this.state.store, 
			'payment_method': this.state.payment_method,
			'Date_Time': fixDate( this.state.date ), 
			'category': this.state.category } ) )
		socket.on('TRANSACTION_DATA', data => {
			console.log( data );
			this.setState({ transaction_data: data })	
		});
	}
	componentDidMount() {	
		socket.on('STORE_ADDRESSES', data => {
			this.setState( {names: data } );
		});
	}
	render() {

		return (
			<div className="Selector">
			<h2> Επιλογή Καταστήματος </h2>
			<ComboBox data={this.state.names} onChange={this.handleName}/>
			<ComboBox data={this.state.possible_payment_methods} onChange={this.handlePayment}/>
			<DatePicker selected={this.state.date} onChange={this.handleDate}/>
			<TransactionTable data={this.state.transaction_data}/>
			</div>
		);
	}
}

class ClientSelector extends React.Component {
	state = {
		item: undefined,
		names: [],
		customer_transactions: [],
		customer_data: [],
		products: [],
		stores: []
	}
	constructor( props ) {
		super( props )
	}
	handleName = (event) => {
		this.state.item = event.target.value;
		socket.emit( 'FETCH_CUSTOMER', event.target.value );
		socket.on('CUSTOMER', data => {
			this.state.customer_data = Object.values( data )[ 0 ];
			socket.emit( 'FETCH_CUSTOMER_TRANSACTIONS', this.state.customer_data[ 'Card_Number' ] );
			socket.emit( 'FETCH_CUSTOMER_STORES', this.state.customer_data[ 'Card_Number' ] );
			socket.emit( 'FETCH_CUSTOMER_TOP_10_PRODUCTS', this.state.customer_data[ 'Card_Number' ] );
		});
		socket.on('CUSTOMER_STORES', data => {
			this.setState( { stores: data } );
		})
		socket.on('CUSTOMER_TOP_10_PRODUCTS', data => {
			this.setState( { products: data } );
		});
		socket.on('CUSTOMER_TRANSACTIONS', data => {
			this.setState( { customer_transactions: data } );
		});
	}
	componentDidMount() {
		socket.on('CUSTOMER_NAMES', data => {
			console.log( data );
			this.setState( {names: data } );
		});
	}
	render() {
		return( 
			<div className="Selector">
			<h1> Επιλογή Πελάτη </h1>
			<ComboBox data={this.state.names} onChange={this.handleName}/>
			<TransactionTable data={this.state.customer_transactions}/>
			</div> );
	}
}

export { TransactionSelector, ClientSelector };
