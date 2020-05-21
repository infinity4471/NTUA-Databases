const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const cors = require('cors');
const url = require('url');
const mysql = require('mysql');
const io = require('socket.io')(server);

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
	socket.on('SELECT_CUSTOMER', (name) => {
		let myquery = "select * from Customer where Name = '" + name + "'";
		db.query( myquery, ( error, result ) => {
			customer_data = result;
			console.log( customer_data )
			socket.emit('CUSTOMER_DATA', customer_data );
		});
	});
	socket.on('FETCH_TRANSACTIONS', data => {
		let myquery = "select * from Transaction";
		var newDict = {}
		var keyList = Object.keys( data )
		for( var i = 0; i < keyList.length; i++ ) {
			var curKey = keyList[ i ]
			if( data[ curKey ] == undefined ) continue;
			newDict[ curKey ] = data[ curKey ]
		}
		keyList = Object.keys( newDict )
		if( keyList.length ) myquery += " where";
		for( var i = 0; i < keyList.length; i++ ) {
			var curKey = keyList[ i ]
			myquery += " ";
			if( curKey == 'Date_Time' ) {
				myquery += "Date(" + curKey + ") = ";
			} else {
				myquery += curKey + " = ";
			}
			if( !Number.isInteger( newDict[ curKey ] ) ) {
				myquery += "'" + newDict[ curKey ] + "'"
			} else {
				myquery += newDict[ curKey ]
			}
			if( i != keyList.length - 1 ) myquery += " and";
		}
		db.query( myquery, ( error, result ) => {
			transaction_data = result;
			socket.emit('TRANSACTION_DATA', transaction_data );
		});
	});
	socket.on('FETCH_CUSTOMER_TRANSACTIONS', card_number => {	
		let myquery = "select Total_amount, Transaction.Date_Time, Payment_method from Transaction inner join Performs on Performs.Card_Number = '" + card_number + "' and Transaction.Date_Time = Performs.Date_Time";	
		db.query( myquery, ( error, result ) => {
			customer_transaction_data = result
			socket.emit('CUSTOMER_TRANSACTIONS', customer_transaction_data )
		});
	});
});
