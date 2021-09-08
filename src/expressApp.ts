import express, { Application, Request, Response } from 'express';
import cors from 'cors';

//import routes
import streamRoutes from './routes/stream.routes';

//init server
const app: Application = express();

app.use(cors());

app.get('/api', (req: Request, res: Response) => { //initial route
	res.send('Camerons Cazoo Streaming Service!');
});

streamRoutes(app);

export default app;
