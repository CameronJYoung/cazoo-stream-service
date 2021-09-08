import fs from 'fs';

const path = './src/exampleSounds/';

export default function getSounds(): Array<string> {
	return fs.readdirSync(path);
}