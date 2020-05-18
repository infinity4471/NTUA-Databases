import React, { Component } from 'react';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import {ProductTable} from './Tables';

import '@progress/kendo-theme-default/dist/all.css'

function StoreSelector( {items,ProductData} ) {
	const [state, setState] = React.useState({item: undefined, open: false, grid: null})
	const handleChange = (event) => {
		setState({ ...state, open: true })
		setState({ ...state, item: event.target.value })
		setState({ ...state, grid: ( <ProductTable columnData={ProductData}/> ) })
	}
	return (
		<div className="Selector">
		<h1> Επιλογή Καταστήματος </h1>
		<ComboBox data={items} onChange={handleChange} />
		{state.grid}
		</div>
        );
}

function ClientSelector( {items, ClientData} ) {
	const [state, setState] = React.useState({item: undefined, open: false, grid: null})
	const handleChange = (event) => {
		setState({ ...state, open: true })
		setState({ ...state, item: event.target.value })	
		setState({ ...state, grid: ( <ProductTable columnData={ClientData}/> ) })
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
