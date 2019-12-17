require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const Itinerary = require('../lib/models/Itinerary');

describe('Itinerary routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  let itinerary;
  beforeEach(async() => {
    trip = await Trip.create({
      location: 'Portland',
      startDate: new Date('2019-12-21'),
      endDate: new Date('2019-12-29')
    });

    itinerary = await Itinerary.create({
      name: 'Fishing',
      date: Date.now(),
      tripId: trip._id,
      woeId: 2475687
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can post a itinerary', () => {
    return request(app)
      .post('/api/v1/itinerary')
      .send({
        name: 'Fishing',
        date: Date.now(),
        tripId: trip._id,
        lat: 45.5366746,
        long: -122.6707292,
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Fishing',
          date: expect.any(String),
          tripId: trip._id.toString(),
          woeId: 2475687,
          __v: 0
        });
      });
  });

  it('can delete an itinerary item', () => {
    return request(app)
      .delete(`/api/v1/itinerary/${itinerary._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: itinerary._id.toString(),
          name: itinerary.name,
          date: expect.any(String),
          tripId: itinerary.tripId.toString(),
          woeId: itinerary.woeId,
          __v: 0
        });
      });
  });
});
