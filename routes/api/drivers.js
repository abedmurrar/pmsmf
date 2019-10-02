/* Express Router */
const express = require('express');

const router = express.Router();

/* Model */
const { Driver } = require('../../models');
const { BaseController } = require('../../controllers');
const { driverValidation } = require('../middleware');

const DriverController = new BaseController(Driver);

/* GET array of cars */
router
    .route('/drivers/:id?')
    .get(DriverController.getObjectsWithPagination)
    .post(driverValidation, DriverController.createOne)
    .get(DriverController.getOneById)
    .put(DriverController.updateOneById)
    .delete(DriverController.deleteOneById);

module.exports = router;
