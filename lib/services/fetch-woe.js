const superagent = require('superagent');

const getWoe = (lat, long) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
    .then(res => {
      const [{ woeid }] = res.body;

      return woeid;
    });
};

module.exports = {
  getWoe
};
