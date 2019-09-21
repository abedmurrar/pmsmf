/* Express Router */
const express = require('express');
const router = express.Router();

/* Model */
const { Rally, Speed, Drift } = require('../../models');
const BaseController = require('../../controllers/baseController');

const { noQueryParams } = require('../middleware');

const RallyController = new BaseController(Rally);

/* GET array of rallies */
router
    .route('/rallies/:id?')
    .get(RallyController.getObjectsWithPagination)
    .post(noQueryParams, RallyController.createOne)
    .get(RallyController.getOneById)
    .put(RallyController.updateOneById)
    .delete(RallyController.deleteOneById);

router.get('/rallies/speed', async (req, res, next) => {
    try {
        const speedRallies = await Speed.query().throwIfNotFound();
        res.json(speedRallies);
    } catch (err) {
        next(err);
    }
});

router.get('/rallies/drift', async (req, res, next) => {
    try {
        const driftRallies = await Drift.query().throwIfNotFound();
        res.json(driftRallies);
    } catch (err) {
        next(err);
    }
});

router
    .route('/rallies/:rallyId/speed/:speedId?')
    .get(async (req, res, next) => {
        if (req.params.speedId) {
            return next();
        }
        const rallies = await Speed.query()
            .where('rally_id', req.params.rallyId)
            .eager('drivers.car')
            .throwIfNotFound();
        res.json(rallies);
    })
    .get()
    .post()
    .put()
    .delete();

module.exports = router;

// TODO: READ https://github.com/Vincit/objection.js/blob/master/examples/express-es6/api.js
