const updateCustomers = (data) => ({
	type: 'UPDATE_CUSTOMERS',
	payload: data
});

const updateCustomersData = (data) => ({
	type: 'UPDATE_CUSTOMERS_DATA',
	payload: data
});

const selectCustomer = (data) => ({
	type: 'SELECT_CUSTOMER',
	payload: data
});

export {updateCustomers, updateCustomersData, selectCustomer};
