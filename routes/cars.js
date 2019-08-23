/* Express Router */
const express = require('express');

const router = express.Router();

/* Model */
const { Car } = require('../models');

/* GET array of cars */
router.get('/', async(req, res, next) => {
    const cars = await Car.query();
    res.json(cars);
});

/* GET car by id */

router
    .route('/:id')
    .get('/:id', async(req, res, next) => {
        const car = await Car.query()
            .findById(req.params.id)
            .eager("drivers");
        res.json(car);
    })
    .put('/:id', async(req, res, next) => {
        const car = await Car.query()
            .findById(req.params.id)
            .eager("drivers");
        res.json(car);
    })
    .delete('/:id', async(req, res, next) => {
        const car = await Car.query()
            .findById(req.params.id)
            .eager("drivers");
        res.json(car);
    });

module.exports = router;

// TODO: READ https://github.com/Vincit/objection.js/blob/master/examples/express-es6/api.js