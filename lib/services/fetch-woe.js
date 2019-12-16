const superagent = require('superagent');

const getWoe = (lat, long) => {
  return superagent
    .get(`/api/location/search/?lattlong=${lat},${long}`)
    .then(res => {
      const [{ woeId }] = res.body;

      return woeId;
    });
};

module.exports = {
  getWoe
};
