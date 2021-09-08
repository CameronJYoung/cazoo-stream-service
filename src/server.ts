import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import WebSocket from 'ws';
import fs from 'fs';

import app from './expressApp';

const port = parseInt(process.env.REST_PORT as string);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});



const tracks = ['test.mp3'];


wss.on('connection', (ws: WebSocket) => {



	ws.on('message', (message) => {
		if (message !== '0') {
			ws.send(`INVALID REQUEST: ${message}`);
		}

		const videoSize = fs.statSync(`./src/exampleSounds/${tracks[0]}`).size;
		const myReadStream = fs.createReadStream(`./src/exampleSounds/${tracks[0]}`);

		const CHUNK_SIZE = 10 ** 6;
		
		
		
		myReadStream.on('data', (chunk) => {
			ws.send(chunk);
		});
		myReadStream.on('error', () => {
			ws.send('ERROR');
		});
		myReadStream.on('end', () => {
			ws.close();
		});
	});

	ws.send('Connected');
});

server.listen(port || 5454, () => {
	console.log(`Server listening on: http://localhost:${port}/api`);
});


