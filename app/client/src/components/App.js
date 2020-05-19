import React from 'react';
import {StoreSelector, ClientSelector} from './MenuSelector';
import { connect } from 'react-redux';
import {selectCustomer, updateCustomers, updateStores, updateCustomersData} from '../actions';

const App = ({
	addresses,
	names,
	customer_data,
	store_data
}) => {
	return (
		<div id="App">
			<StoreSelector items={addresses} grid_data={store_data}/>
			<ClientSelector items={names} grid_data={customer_data}/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	names: state.customers.names,
	addresses: state.stores.addresses,
});

const mapDispatchToProps = (dispatch) => ({
	updateCustomers: (names) => dispatch(updateCustomers(names)),	
	updateStores: (addresses) => dispatch(updateStores(addresses))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

