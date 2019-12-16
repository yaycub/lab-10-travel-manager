const { Router } = require('express');
const Trip = require('../models/Trip');

module.exports = Router()
  .post('/', (req, res, next) => {
    Trip
      .create(req.body)
      .then(trip => res.send(trip))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Trip
      .find()
      .select({ location: true })
      .then(trips => res.send(trips))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Trip
      .findById(req.params.id)
      .then(trip => res.send(trip))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Trip
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(trip => res.send(trip))
      .catch(next);
  });
