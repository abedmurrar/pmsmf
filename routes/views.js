/* Express Router */
const express = require('express');

const router = express.Router();
const { Car, Driver, Rally } = require('../models');

/* Dashboard */
router.route('/').get(async (req, res) => {
    // console.log(req.params);
    res.render('base.ejs', { title: 'abed' });
});

/* Car Forms */
router.get('/cars/create', async (req, res) => {
    res.render('forms/car.ejs', {
        title: 'Create car',
        card_header: 'Create new car',
        form: {},
        action: '/api/cars',
        method: 'POST'
    });
});

router.get('/cars/:id/update', async (req, res, next) => {
    try {
        const object = await Car.query()
            .findById(req.params.id)
            .throwIfNotFound();
        res.render('forms/car.ejs', {
            title: 'Update car',
            form: object,
            card_header: 'Update car',
            action: `/api/cars/${req.params.id}`,
            method: 'PUT'
        });
    } catch (err) {
        next(err);
    }
});

/* Driver Forms */
router.get('/drivers/create', async (req, res) => {
    res.render('forms/driver.ejs', {
        title: 'Create Driver',
        card_header: 'Create new driver',
        form: {},
        action: '/api/drivers',
        method: 'POST'
    });
});

router.get('/drivers/:id/update', async (req, res, next) => {
    try {
        const object = await Driver.query()
            .findById(req.params.id)
            .throwIfNotFound();
        res.render('forms/driver.ejs', {
            title: 'Update driver',
            form: object,
            card_header: 'Update driver',
            action: `/api/cars/${req.params.id}`,
            method: 'PUT'
        });
    } catch (err) {
        next(err);
    }
});

/* Rally Forms */
router.get('/rallies/create', async (req, res) => {
    res.render('forms/rally.ejs', {
        title: 'Create rally',
        card_header: 'Create new rally',
        form: {},
        action: '/api/rallies',
        method: 'POST'
    });
});

router.get('/rallies/:id/update', async (req, res, next) => {
    try {
        const object = await Rally.query()
            .findById(req.params.id)
            .throwIfNotFound();
        res.render('forms/rally.ejs', {
            title: 'Update rally',
            form: object,
            card_header: 'Update rally',
            action: `/api/rallies/${req.params.id}`,
            method: 'PUT'
        });
    } catch (err) {
        next(err);
    }
});

/* Tables */
router.get('/cars', async (req, res) => {
    res.render('tables/cars.ejs', { title: 'cars' });
});
router.get('/drivers', async (req, res) => {
    res.render('tables/drivers.ejs', { title: 'drivers' });
});

router.get('/rallies', async (req, res) => {
    res.render('tables/rallies.ejs', { title: 'rallies' });
});

module.exports = router;
