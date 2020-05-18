import io from 'socket.io-client';

const url = "http://localhost:8000"

function connect( url ) {
	let socket = io( url )
	return socket
}

const Socket = connect( url )

export { Socket };
