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
        console.log(req.query);
        const { draw, columns, order, start, length, search, _ } = req.query;
        // console.log(req.query.columns[0].search)
        if (req.params.id) {
            return next();
        }

        Car.knex().from('cars').columnInfo().then(console.log)

        const columnsNames = columns.map(column => column.data);
        const eagerColumnNames = columnsNames.filter(
            column => column in Object.keys(Car.relationMappings)
        );
        const orders = order.map(orderObj => {
            return { column: columnsNames[orderObj.column], order: orderObj.dir };
        });
        const cars = await Car.query()
            .select(columnsNames)
            .eager(eagerColumnNames)
            .offset(parseInt(start, 10) + 1)
            .limit(length)
            .range()
            .orderBy(orders)
            .throwIfNotFound();
        res.json({ data: cars, draw, recordsTotal: cars.total, recordsFiltered: cars.total });
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
                .limit(10)
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
