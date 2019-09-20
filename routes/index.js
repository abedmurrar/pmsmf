/* Express Router */
const express = require('express');

const router = express.Router();

const { Car } = require('../models');

router.route('/').get(async (req, res) => {
    // console.log(req.params);
    res.render('base.ejs', { title: 'abed' });
});

router.get('/cars', async (req, res) => {
    const cars = await Car.query().eager('drivers');
    res.render('cars.ejs', { title: 'cars', cars });
});

module.exports = router;
