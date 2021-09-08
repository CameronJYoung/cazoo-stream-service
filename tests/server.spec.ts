import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('http://localhost:3000');

describe('Server Tests', () => {
	it('server is created without error', (done) => {
		request.get('/api').end((err, res: supertest.Response) => {
			if (err) {
				console.log(err);
			}

			expect(res.statusCode).to.be.equal(200);
			done();
		});
	});


});