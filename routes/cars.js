/* Express Router */
const express = require('express');

const router = express.Router();

const HTTPStatus = require('./status_codes');

/* Model */
const { Car } = require('../models');

/* GET array of cars */
router.get('/', async (req, res) => {
    const cars = await Car.query();
    res.json(cars);
});

router
    .route('/:id')
    .get(async (req, res) => {
        const car = await Car.query()
            .findById(req.params.id)
            .eager('drivers');
        res.json(car);
    })
    .put(async (req, res) => {
        const car = await Car.query()
            .findById(req.params.id)
            .eager('drivers');
        res.json(car);
    })
    .delete(async (req, res) => {
        const isDeleted = await Car.query().deleteById(req.params.id);
        if (isDeleted) res.status(HTTPStatus.NO_CONTENT).json(null);
        else throw new Error('Not found');
    });

module.exports = router;

// TODO: READ https://github.com/Vincit/objection.js/blob/master/examples/express-es6/api.js
