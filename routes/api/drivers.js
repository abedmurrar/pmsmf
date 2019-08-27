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
    .get(async (req, res) => {
        const driver = await Driver.query()
            .findById(req.params.id)
            .eager('car');
        res.json(driver);
    })
    .put(async (req, res) => {
        const driver = await Driver.query()
            .findById(req.params.id)
            .eager('car');
        res.json(driver);
    })
    .delete(async (req, res) => {
        const isDeleted = await Driver.query().deleteById(req.params.id);
        if (isDeleted) res.status(HTTPStatus.NO_CONTENT).json(null);
        else throw new Error('Not found');
    });

module.exports = router;
