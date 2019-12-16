const mongoose = require('mongoose');
const Trip = require('./Trip');

describe('Trip Model', () => {
  it('requires a location', () => {
    const trip = new Trip();

    expect(trip.validateSync().errors.location.message).toEqual('Path `location` is required.');
  });

  it('requires a start date', () => {
    const trip = new Trip({
      location: 'Portland'
    });

    expect(trip.validateSync().errors.startDate.message).toEqual('Path `startDate` is required.');
  });

  it('requires a end date', () => {
    const trip = new Trip({
      location: 'Portland',
      startDate: Date.now()
    });

    expect(trip.validateSync().errors.endDate.message).toEqual('Path `endDate` is required.');
  });
});
