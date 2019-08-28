/* Express Router */
const express = require('express');

const router = express.Router();

const HTTPStatus = require('../status_codes');

/* Model */
const { Rally } = require('../../models');

// TODO : 1) check session 2) check permission

/* GET array of cars */
router.get('/', async (req, res) => {
    const rallies = await Rally.query().eager('car');
    res.json(rallies);
});

router
    .route('/:id')
    .get(async (req, res) => {
        const rally = await Rally.query()
            .findById(req.params.id)
            .eager('car');
        res.json(rally);
    })
    .put(async (req, res) => {
        const rally = await Rally.query()
            .findById(req.params.id)
            .eager('car');
        res.json(rally);
    })
    .delete(async (req, res) => {
        const isDeleted = await Rally.query().deleteById(req.params.id);
        if (isDeleted) res.status(HTTPStatus.NO_CONTENT).json(null);
        else throw new Error('Not found');
    });

module.exports = router;
