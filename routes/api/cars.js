/* Express Router */
const express = require('express');
const { body, sanitizeBody } = require('express-validator');

const router = express.Router();

const HTTPStatus = require('../status_codes');

/* Model */
const { Car } = require('../../models');
// const CarController = require('../../controllers/carController');
const BaseController = require('../../controllers/baseController');
const { noQueryParams, carValidation } = require('../middleware');

const CarController = new BaseController(Car);

/* GET array of cars */
router
    .route('/cars/:id?')
    .get(CarController.getObjectsWithPagination)
    .post(carValidation, CarController.createOne)
    .get(CarController.getOneById)
    .put(CarController.updateOneById)
    .delete(CarController.deleteOneById);

module.exports = router;
