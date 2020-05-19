import { customersReducer } from './customersReducer';
import { storesReducer } from './storesReducer';

import { combineReducers } from 'redux';

const reducer = combineReducers({
	customers: customersReducer,
	stores: storesReducer
});

export default reducer;
