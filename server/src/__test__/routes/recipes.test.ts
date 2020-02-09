import { isEqual } from 'lodash';
import request from 'supertest';
import app from '../../app';

describe('Recipes API', () => {
  test('Should stop process the query if didnot provide food name', async () => {
    await request(app)
      .get('/api/recipes')
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        expect(
          isEqual(
            res.body.msg,
            'Fruit Name is required & Fruit Name must be string'
          )
        ).toBeTruthy();
      });
  });

  test('Should return it is not fruit if the query name is not fruit', async () => {
    await request(app)
      .get('/api/recipes/?name=helloworld')
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        expect(
          isEqual(res.body.msg, `I don't believe this is a fruit`)
        ).toBeTruthy();
      });
  });

  test('Should return recipes if the query name is identified as food', async () => {
    await request(app)
      .get('/api/recipes/?name=banana')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        // Should recieve the success msg
        expect(
          isEqual(
            res.body.msg,
            'Success! Best recipe has been saved to csv! Here is the top recipes'
          )
        ).toBeTruthy();
        // Recipes must be more than 1
        expect(res.body.results.length).toBeGreaterThan(0);
      });
  });
});
