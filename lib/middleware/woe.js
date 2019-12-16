const { getWoe } = require('../services/fetch-woe');

module.exports = (req, res, next) => {
  const { lat, long } = req.body;
  
  getWoe(lat, long)
    .then(woeId => {
      req.woeId = woeId;
      next();
    });
};
