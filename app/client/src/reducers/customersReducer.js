import io from 'socket.io-client';
import { initialCustomersState } from './initialState';

const customersReducer = (state = initialCustomersState, action ) => {
	switch( action.type ) {
		case 'UPDATE_CUSTOMERS':
			return Object.freeze({
				...state,
				names: [
					...action.payload
				]
			});
			break;
		case 'UPDATE_CUSTOMERS_DATA':
			return Object.freeze({
				...state,
				data: [
					...action.payload
				]	
			});
			break;
		case 'SELECT_CUSTOMER':
			return Object.freeze({
				...state,
				selected_name: [
					...action.payload
				]	
			});
			break;

		default: return state
	}
}

export {customersReducer};
