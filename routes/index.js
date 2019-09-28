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
    res.render('forms/car.ejs', { title: 'Create car' });
});

router.get('/cars/:id/update', async (req, res, next) => {
    try {
        const object = await Car.query()
            .findById(req.params.id)
            .throwIfNotFound();
        res.render('forms/car.ejs', { title: 'Update car', form: object });
    } catch (err) {
        next(err);
    }
});

/* Driver Forms */
router.get('/drivers/create', async (req, res) => {
    res.render('forms/driver.ejs', { title: '`Create Driver' });
});

router.get('/drivers/:id/update', async (req, res, next) => {
    try {
        const object = await Driver.query()
            .findById(req.params.id)
            .throwIfNotFound();
        res.render('forms/driver.ejs', { title: '`Update Driver', form: object });
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

router.get('/test/:id', async (req, res, next)=>{
    try {
        const object = await Driver.query()
            .select('*')
            .findById(req.params.id)
            .eager('car' )
            .throwIfNotFound();
        console.log(object)
        res.json(null);
    } catch (err) {
        next(err);
    }
})

module.exports = router;
