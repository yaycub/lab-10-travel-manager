const mongoose = require('mongoose');
const Itinerary = require('./Itinerary');

describe('Itinerary model', () => {
  it('requires name field', () => {
    const itinerary = new Itinerary();
    const { errors } = itinerary.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('requires date field', () => {
    const itinerary = new Itinerary({
      name: 'snorkeling'
    });

    expect(itinerary.validateSync().errors.date.message).toEqual('Path `date` is required.');
  });

  it('requires tripId', () => {
    const itinerary = new Itinerary({
      name: 'snorkeling',
      date: Date.now()
    });

    expect(itinerary.validateSync().errors.tripId.message).toEqual('Path `tripId` is required.');
  });

  it('requires a woeId', () => {
    const itinerary = new Itinerary({
      name: 'snorkeling',
      date: Date.now(),
      tripId: mongoose.Schema.Types.ObjectId
    });

    expect(itinerary.validateSync().errors.woeId.message).toEqual('Path `woeId` is required.');
  });
});
