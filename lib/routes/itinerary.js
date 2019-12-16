const { Router } = require('express');
const Itinerary = require('../models/Itinerary');
const fetchWoe = require('../middleware/woe');

module.exports = Router()
  .post('/', fetchWoe, (req, res, next) => {
    const woeId = req.woeId;

    Itinerary
      .create({
        ...req.body,
        woeId
      })
      .then(itin => res.send(itin))
      .catch(next);
  });
