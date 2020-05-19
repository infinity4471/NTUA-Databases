import io from 'socket.io-client';
import { updateCustomers, updateStores,updateCustomersData } from '../../actions';

const socketMiddleware = (url) => {
	return store => {
		let socket = io(url);
		socket.on('CUSTOMER_NAMES', data => {
			store.dispatch(updateCustomers(data))	
		});
		socket.on('STORE_ADDRESSES', data => {
			store.dispatch(updateStores(data))
		});
		socket.on('CUSTOMER_DATA', data => {
			store.dispatch(updateCustomersData(data))
		});
		return next => action => {
			console.log( action.type )
        		switch(action.type) {
				case 'SELECT_CUSTOMER':
					socket.emit( 'SELECT_CUSTOMER', action.payload )
					break
				default: break
			}
			return next( action );
		}
	}
}

export {socketMiddleware};
