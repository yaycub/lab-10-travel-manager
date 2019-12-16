const mongoose = require('mongoose');

const schema = mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

schema.virtual('itinerary', {
  ref: 'Itinerary',
  localField: '_id',
  foreignField: 'tripId'
});

module.exports = mongoose.model('Trip', schema);
