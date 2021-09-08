import express, { Router, Application } from 'express';
import stream from '../controllers/stream.controller';

const router: Router = express.Router();

export default (app: Application): Application => {
	router.get('/song/:songID', stream.getSong);

	app.use('/api/stream', router);
	return app;
};