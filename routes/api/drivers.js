/* Express Router */
const express = require('express');

const router = express.Router();

const HTTPStatus = require('../status_codes');

/* Model */
const { Driver } = require('../../models');

/* GET array of cars */
router.get('/', async (req, res) => {
    const drivers = await Driver.query().eager('car');
    res.json(drivers);
});

router
    .route('/:id')
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
                .findById(req.params.id)
                .eager('car')
                .throwIfNotFound();
            res.json(driver);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const isDeleted = await Driver.query()
                .deleteById(req.params.id)
                .throwIfNotFound();
            res.status(HTTPStatus.NO_CONTENT).json(null);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
