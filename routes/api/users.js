/* Express Router */
const express = require('express');

const router = express.Router();

const HTTPStatus = require('../status_codes');

/* Model */
const { User } = require('../../models');

const { noQueryParams } = require('../middleware');

/* GET array of users */
router
    .route('/users/:id?')
    .get(async (req, res, next) => {
        if (req.params.id) {
            return next();
        }
        const users = await User.query().throwIfNotFound();
        res.json(users);
    })
    .post(noQueryParams, async (req, res, next) => {
        try {
            const user = await User.query().insertGraphAndFetch(req.body);
            res.status(HTTPStatus.CREATED).json(user);
        } catch (err) {
            next(err);
        }
    })
    .get(async (req, res, next) => {
        try {
            const user = await User.query()
                .findById(req.params.id)
                .throwIfNotFound();
            res.json(user);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const user = await User.query()
                .patchAndFetchById(req.params.id, req.body)
                .throwIfNotFound();
            res.status(HTTPStatus.OK).json(user);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            await User.query()
                .deleteById(req.params.id)
                .throwIfNotFound();
            res.status(HTTPStatus.NO_CONTENT).json(null);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
