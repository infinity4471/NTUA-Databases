const url = "http://localhost:8000"

const socket = require('socket.io-client')(url);

const args = process.argv.slice( 2 );
const signal = args[ 0 ];

if( signal == 'INSERT' ) {
	const table = args[ 1 ];
	const filename = args[ 2 ];
	console.log( filename );
	const data = require('./' + filename );
	socket.emit( "FETCH_INSERT_OR_UPDATE_" + table.toUpperCase(), data );
	socket.on( "INSERT_OR_UPDATE_" + table.toUpperCase(), data => {
		console.log( data );
	});
} else {
	if( args.length < 2 ) {
		socket.emit( "FETCH_" + signal );
		socket.on( signal, data => {
			console.log( data );
		});
	} 
	else if( args.length == 2 ) {
		const data = args[ 1 ]
		socket.emit( "FETCH_" + signal, ( data ) );
		socket.on( signal , data => {
			console.log( data );
		});
	} else {
		socket.emit( "FETCH_" + signal, args[ 1 ], args[ 2 ] );
		socket.on( signal , data => {
			console.log( data );
		});
		
	}
}
