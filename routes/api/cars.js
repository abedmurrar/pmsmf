/* Express Router */
const express = require('express');

const router = express.Router();

const HTTPStatus = require('../status_codes');

/* Model */
const { Car } = require('../../models');

const { noQueryParams } = require('../middleware');

/* GET array of cars */
router
    .route('/cars/:id?')
    .get(async (req, res, next) => {
        if (req.params.id) {
            return next();
        }
        const cars = await Car.query()
            .eager('drivers')
            .throwIfNotFound();
        res.json(cars);
    })
    .post(noQueryParams, async (req, res, next) => {
        try {
            const car = await Car.query().insertGraphAndFetch(req.body);
            res.status(HTTPStatus.CREATED).json(car);
        } catch (err) {
            next(err);
        }
    })
    .get(async (req, res, next) => {
        try {
            const car = await Car.query()
                .findById(req.params.id)
                .eager('drivers')
                .throwIfNotFound();
            res.json(car);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const car = await Car.query()
                .patchAndFetchById(req.params.id, req.body)
                .throwIfNotFound();
            res.status(HTTPStatus.OK).json(car);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            await Car.query()
                .deleteById(req.params.id)
                .throwIfNotFound();
            res.status(HTTPStatus.NO_CONTENT).json(null);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;

// TODO: READ https://github.com/Vincit/objection.js/blob/master/examples/express-es6/api.js
