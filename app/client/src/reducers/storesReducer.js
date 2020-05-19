import { initialStoresState } from './initialState';

const storesReducer = (state = initialStoresState, action ) => {
	switch( action.type ) {
		case 'UPDATE_STORES':
			return Object.freeze({
				...state,
				addresses: [
					...action.payload
				]
				
			});
		default: return state
	}
}

export {storesReducer};
