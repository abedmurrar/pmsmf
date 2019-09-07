/* Express Router */
const express = require('express');
const { body, sanitizeBody } = require('express-validator');

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
    .post(
        [
            body('manufacturer')
                .isString()
                .trim()
                .escape(),
            body('model')
                .isString()
                .trim()
                .escape(),
            body('year_of_production')
                .isNumeric()
                .matches('^[0-9]{4}$'),
            body('license_no')
                .isNumeric()
                .matches('^[A-Za-z0-9]{6,7}$'),
            body('car_class')
                .isString()
                .trim()
                .escape(),
            body('push_type')
                .isString()
                .trim()
                .escape()
        ],
        noQueryParams,
        async (req, res, next) => {
            try {
                const car = await Car.query().insertGraphAndFetch(req.body);
                res.status(HTTPStatus.CREATED).json(car);
            } catch (err) {
                next(err);
            }
        }
    )
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
