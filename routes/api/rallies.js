/* Express Router */
const express = require('express');

const router = express.Router();

const HTTPStatus = require('../status_codes');

/* Model */
const { Rally } = require('../../models');

const { noQueryParams } = require('../middleware');

/* GET array of rallies */
router
    .route('/rallies/:id?')
    .get(async (req, res, next) => {
        if (req.params.id) {
            return next();
        }
        const rallies = await Rally.query()
            // .eager('drivers')
            .throwIfNotFound();
        res.json(rallies);
    })
    .post(noQueryParams, async (req, res, next) => {
        try {
            const rally = await Rally.query().insertGraphAndFetch(req.body);
            res.status(HTTPStatus.CREATED).json(rally);
        } catch (err) {
            next(err);
        }
    })
    .get(async (req, res, next) => {
        try {
            const rally = await Rally.query()
                .findById(req.params.id)
                // .eager('drivers')
                .throwIfNotFound();
            res.json(rally);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const rally = await Rally.query()
                .patchAndFetchById(req.params.id, req.body)
                .throwIfNotFound();
            res.status(HTTPStatus.OK).json(rally);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            await Rally.query()
                .deleteById(req.params.id)
                .throwIfNotFound();
            res.status(HTTPStatus.NO_CONTENT).json(null);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;

// TODO: READ https://github.com/Vincit/objection.js/blob/master/examples/express-es6/api.js
