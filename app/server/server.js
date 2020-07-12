const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const cors = require('cors');
const url = require('url');
const mysql = require('mysql');
const io = require('socket.io')(server, { wsEngine: 'ws' });

const customerQueries = require('./queries/customer');
const storeQueries = require('./queries/store');
const transactionQueries = require('./queries/transaction');
const productQueries = require('./queries/product');

function keyFromDict( json_packet, key ) {
	var result = []
	for( var i = 0; i < json_packet.length; i++ ) {
		result.push( json_packet[ i ][ key ] );
	}
	return result;
}

//setting up the database
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'TSUPEMAKI',
    timezone: 'Z',
    dateStrings: 'true'
});

db.connect( function( err ) {
    if( err ) throw err;
    console.log("Connected to DB\n")
})

server.listen(8000, () => console.log("Server is listening to port 8000"));

app.use(cors());

app.get('/', (req, res) => {
  const q = url.parse(req.url);
  res.sendFile(path.join(__dirname,'/../client/public','index.html'));
})

app.use(express.static(path.join(__dirname,'/../client/client')));

const fetchTables = () => {
	db.query('select * from Products', ( error, result ) => {
		if( error ) throw error;
		products = result;
	});
}

//fetchTables()

const fetchAndSendTables = socket => {
	db.query('select Name from Customer', ( error, result ) => {
		customers = keyFromDict( result, 'Name' );
		socket.emit('CUSTOMER_NAMES', customers );
	});
	db.query('select * from Transaction', ( error, result ) => {
		transaction_data = result;
		socket.emit('TRANSACTION_DATA', transaction_data );
	});
	db.query('select address from Stores', ( error, result ) => {
		addresses = keyFromDict( result, 'address' );
		socket.emit('STORE_ADDRESSES', addresses );
	});
}


io.on('connection', (socket) => {
	fetchAndSendTables(socket);
	socket.on('FETCH_CUSTOMER', (name) => {
		console.log( customerQueries.selectCustomer( name ) )
		db.query( customerQueries.selectCustomer( name ), ( error, result ) => {
			console.log( result )
			socket.emit('CUSTOMER', result );
		});
	});
	socket.on('FETCH_TRANSACTIONS', data => {
		let myquery = "select Transaction.Total_amount, Transaction.Date_Time, Transaction.Payment_method from Transaction";
		let cnt = 0;
		console.log( data );
		if( data[ 'store' ] != undefined ) {
			myquery += " JOIN Contains ON Transaction.Date_Time = Contains.Date_Time JOIN Products ON Products.Barcode = Contains.Barcode JOIN Offers ON Offers.Barcode = Products.Barcode JOIN Stores ON Stores.Store_id = Offers.Store_id WHERE Stores.Address = '" + data[ 'store' ] + "' ";
			cnt++;
		} else {
			myquery += " WHERE ";
		}
		if( data[ 'payment_method' ] != undefined ) {
			if( cnt ) myquery += " AND ";
			cnt++;
			myquery += "Transaction.payment_method = " + data[ 'payment_method' ] + " ";
		}
		if( data[ 'Date_Time' ] != undefined ) {
			if( cnt ) myquery += "AND ";
			myquery += "DATE( Transaction.Date_Time ) = '" + data[ 'Date_Time' ] + "' ";
			cnt++;
		}
		myquery += ";";
		console.log( myquery );
		db.query( myquery, ( error, result ) => {
			console.log( result );
			socket.emit("TRANSACTION_DATA", result );
		});
	});
	socket.on('FETCH_CUSTOMER_STORES', card_number => {
		db.query( customerQueries.fetchStores( card_number ), ( error, result ) => {
			socket.emit('CUSTOMER_STORES', result )
		});
	});
	socket.on('FETCH_CUSTOMER_TRANSACTIONS', card_number => {
		console.log( customerQueries.fetchTransactions( card_number ) );
		db.query( customerQueries.fetchTransactions( card_number ), ( error, result ) => {
			socket.emit('CUSTOMER_TRANSACTIONS', result )
		});
	});
	socket.on('FETCH_CUSTOMER_TOP_10_PRODUCTS', card_number => {
		db.query( customerQueries.fetchTop10Products( card_number), ( error, result ) => {
			socket.emit('CUSTOMER_TOP_10_PRODUCTS', result )
		});
	});
	socket.on('FETCH_TOP_ALLEY_SHELF', store_id => {
		db.query( storeQueries.fetchTopAlleyShelf( store_id ), ( error, result ) => {
			socket.emit('TOP_ALLEY_SHELF', result )
		});
	});
	socket.on('FETCH_TOP_HOURS', () => {
		db.query( transactionQueries.fetchTopHours(), ( error, result ) => {
			socket.emit('TOP_HOURS', result )
		});
	});
	socket.on("FETCH_AVERAGE_OVER_MONTH", card_number => {
		db.query( customerQueries.fetchAverageOverMonth( card_number ), ( error, result ) => {
			socket.emit('AVERAGE_OVER_MONTH', result )
		});
	});
	socket.on("FETCH_NUMBER_OF_STORES_PER_CUSTOMER", card_number => {
		db.query( customerQueries.fetchNumberOfStoresPerCustomer( card_number ), ( error, result ) => {
			socket.emit('NUMBER_OF_STORES_PER_CUSTOMER', result )
		});
	});
	socket.on("FETCH_OLDER_PRICES", BarCode => {
		db.query( productQueries.fetchOlderPrices( BarCode ), ( error, result ) => {
			socket.emit('OLDER_PRICES', result );
		});
	});
	socket.on("FETCH_INSERT_OR_UPDATE_PRODUCTS", data => {
		db.query( productQueries.insertOrUpdate( data ), ( error, result ) => {
			socket.emit("INSERT_OR_UPDATE_PRODUCTS", result );
		});
	});
	socket.on("FETCH_INSERT_OR_UPDATE_CUSTOMER", data => {
		db.query( customerQueries.insertOrUpdate( data ), ( error, result ) => {
                        socket.emit("INSERT_OR_UPDATE_CUSTOMER", result );
                });
	});
	socket.on("FETCH_INSERT_OR_UPDATE_STORES", data => {
		db.query( storeQueries.insertOrUpdate( data ), ( error, result ) => {
                        socket.emit("INSERT_OR_UPDATE_STORE", result );
                });
	});
	socket.on("FETCH_DELETE_PRODUCT", data => {
		db.query( productQueries.deleteProduct( data ), ( error, result ) => {
			socket.emit("DELETE_PRODUCT", "DELETION_SUCCESSFUL" );
		});
	});
	socket.on("FETCH_DELETE_STORE", data => {
		db.query( storeQueries.deleteStore( data ), ( error, result ) => {
			socket.emit("DELETE_STORE", "DELETION_SUCCESSFUL" );
		});
	});
	socket.on("FETCH_DELETE_CUSTOMER", data => {
		db.query( customerQueries.deleteCustomer( data ), ( error, result ) => {
			socket.emit("DELETE_CUSTOMER", "DELETION_SUCCESSFUL" );
		});
	});
	socket.on("FETCH_TICKET_PERCENTAGE", data => {
		db.query( productQueries.fetchTicketPercentage( data ), ( error, result ) => {
			socket.emit("TICKET_PERCENTAGE", result );
		});
	});
	socket.on("FETCH_COUNT_TRANSACTIONS_PER_HOUR", () => {
		db.query( transactionQueries.fetchCountTransactionsPerHour(), ( error, result ) => {
			socket.emit("COUNT_TRANSACTIONS_PER_HOUR", result );
		});
	});
	socket.on("FETCH_TOP_PRODUCT_PAIRS", () => {
		db.query( productQueries.fetchTopProductPairs(), ( error, result ) => {
			socket.emit("TOP_PRODUCT_PAIRS", result );
		});
	});
	socket.on("FETCH_TOP_CUSTOMERS_PER_STORE", ( address ) => {
		db.query( storeQueries.fetchTopCustomersPerStore( address ), ( error, result ) => {
			socket.emit("TOP_CUSTOMERS_PER_STORE", result );	
		});
	});
	socket.on("FETCH_CUSTOMER_VISITS_PER_HOUR", ( card_number, address ) => {
		db.query( customerQueries.fetchCustomerVisitsPerHour( card_number, address ), ( error, result ) => {
			socket.emit("CUSTOMER_VISITS_PER_HOUR", result );
		});
	});
});
