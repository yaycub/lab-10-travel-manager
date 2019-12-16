require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  beforeEach(async() => {
    trip = await Trip.create({
      location: 'Portland',
      startDate: new Date('2019-12-21'),
      endDate: new Date('2019-12-29')
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        location: 'Portland',
        startDate: Date.now(),
        endDate: Date.now()
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          location: 'Portland',
          startDate: expect.any(String),
          endDate: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all trips', async() => {
    const trips = await Trip.create([
      { location: 'Portland', startDate: Date.now(), endDate: Date.now() },
      { location: 'Chicago', startDate: Date.now(), endDate: Date.now() },
      { location: 'Munich', startDate: Date.now(), endDate: Date.now() }
    ]);

    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        trips.forEach(trip => {
          expect(res.body).toContainEqual({
            _id: trip._id.toString(),
            location: trip.location
          });
        });
      });
  });

  it('can get a single trip', () => {
    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip._id.toString(),
          location: trip.location,
          startDate: trip.startDate.toISOString(),
          endDate: trip.endDate.toISOString(),
          __v: 0
        });
      });
  });

  it('can update a single trip by id', () => {
    return request(app)
      .patch(`/api/v1/trips/${trip._id}`)
      .send({ name: 'Munich' })
      .then(res => {
        expect(res.body).toEqual({
          _id: trip._id.toString(),
          location: trip.location,
          startDate: trip.startDate.toISOString(),
          endDate: trip.endDate.toISOString(),
          __v: 0
        });
      });
  });

  it('can delete a trip by id', () => {
    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip._id.toString(),
          location: trip.location,
          startDate: trip.startDate.toISOString(),
          endDate: trip.endDate.toISOString(),
          __v: 0
        });
      });
  });
});
