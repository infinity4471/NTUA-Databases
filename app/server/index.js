const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const cors = require('cors');
const url = require('url');
const mysql = require('mysql');
const io = require('socket.io')(server);

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
	/*db.query('select * from Products', ( error, result ) => {
		products = result;
		console.log( products );
		socket.emit('PRODUCT_TABLE', products );
	});*/
	db.query('select address from Stores', ( error, result ) => {
		addresses = result;
		console.log( addresses );
		socket.emit('STORE_ADDRESSES', addresses );
	});
}

io.on('connection', (socket) => {
	fetchAndSendTables(socket);
});
