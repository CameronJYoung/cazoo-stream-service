import { Request, Response } from 'express';
import fs from 'fs';

const tracks = ['test.mp3'];

const stream = {
	getSong(req: Request, res: Response): void  {
		const songID = parseInt(req.params.songID);
		if (songID === 0) {
			const range = req.headers.range;
			if (!range) {
				res.status(400).send('RANGE HEADER REQUIRED');
			}

			const videoSize = fs.statSync(`./src/exampleSounds/${tracks[0]}`).size;
			
			
			
			const CHUNK_SIZE = 10 ** 6;
			const start = Number(range?.replace(/\D/g, ''));
			const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

			const contentLength = end - start + 1;
			const headers = {
				'Content-Range': `bytes ${start}-${end}/${videoSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': contentLength,
				'Content-Type': 'audio/mp3'
			};

			res.writeHead(206, headers);
			
			const myReadStream = fs.createReadStream(`./src/exampleSounds/${tracks[0]}`, { start, end });


			myReadStream.pipe(res);

			// myReadStream.on('data', (chunk) => {
			// 	res.write(chunk);
			// });
			// myReadStream.on('error', () => {
			// 	res.sendStatus(404);
			// });
			// myReadStream.on('end', () => {
			// 	res.end();
			// });
		}
		


	}
	
	
};

export default stream;