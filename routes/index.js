/* Express Router */
const express = require('express');

const router = express.Router();

const { Car } = require('../models');

router.route('/').get(async (req, res) => {
    // console.log(req.params);
    res.render('base.ejs', { title: 'abed' });
});

router.get('/cars', async (req, res) => {
    res.render('tables/cars.ejs', { title: 'cars' });
});

// router.get('/cars/create')

router.get('/drivers', async (req, res) => {
    res.render('tables/drivers.ejs', { title: 'drivers' });
});

router.get('/rallies', async (req, res) => {
    res.render('tables/rallies.ejs', { title: 'rallies' });
});

router.get('/test', (req, res) => {
    res.set('Content-Type', 'application/problem+json');
    res.status(500).json({
        type: 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html',
        detail: 'Status failed validation',
        status: 500,
        title: 'Internal Server Error'
    });
});

module.exports = router;
