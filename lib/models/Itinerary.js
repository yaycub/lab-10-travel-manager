const mongoose = require('mongoose-fill');
const { getWeather } = require('../services/fetch-woe');

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

schema.virtual('year')
  .get(function(){
    return this.date.getFullYear();
  });

schema.virtual('day')
  .get(function(){
    return this.date.getDate();
  });

schema.virtual('month')
  .get(function(){
    return this.date.getMonth() + 1;
  });

schema.fill('weather', async function(callback) {
  const date = `${this.year}/${this.month}/${this.day}`;
  const weather = await getWeather(this.woeId, date);
  
  callback(null, weather);
});

module.exports = mongoose.model('Itinerary', schema);
