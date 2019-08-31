/* Express Router */
const express = require('express');

const router = express.Router();

const HTTPStatus = require('../status_codes');

/* Model */
const { Driver } = require('../../models');

const { noQueryParams } = require('../middleware');

/* GET array of cars */
router
    .route('/drivers/:id?')
    .get(async (req, res, next) => {
        if (req.params.id) {
            return next();
        }
        try {
            const drivers = await Driver.query()
                // .eager('car')
                .throwIfNotFound();
            res.json(drivers);
        } catch (err) {
            next(err);
        }
    })
    .post(noQueryParams, async (req, res, next) => {
        try {
            const driver = await Driver.query().insertGraphAndFetch(req.body);
            res.status(HTTPStatus.CREATED).json(driver);
        } catch (err) {
            next(err);
        }
    })
    .get(async (req, res, next) => {
        try {
            const driver = await Driver.query()
                .findById(req.params.id)
                .eager('car')
                .throwIfNotFound();
            res.json(driver);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const driver = await Driver.query()
                .patchAndFetchById(req.params.id, req.body)
                .throwIfNotFound();
            res.status(HTTPStatus.OK).json(driver);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            await Driver.query()
                .deleteById(req.params.id)
                .throwIfNotFound();
            res.status(HTTPStatus.NO_CONTENT).json(null);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
