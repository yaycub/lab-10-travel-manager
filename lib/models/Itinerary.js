const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  woeId: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Itinerary', schema);
