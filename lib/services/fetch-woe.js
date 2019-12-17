const superagent = require('superagent');

const getWoe = (lat, long) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
    .then(res => {
      const [{ woeid }] = res.body;

      return woeid;
    });
};

const getWeather = (woeId, date) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/${woeId}/${date}`)
    .then(res => {
      const [{ weather_state_name, the_temp }] = res.body;
      const temp = (the_temp * 1.8) + 32;

      return [weather_state_name, temp];
    });
};

module.exports = {
  getWoe,
  getWeather
};
