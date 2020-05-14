const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
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

