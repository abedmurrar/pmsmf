/* Express Router */
const express = require('express');

const router = express.Router();

/* Model */
const { User } = require('../../models');
// const UserController = require('../../controllers/UserController');
const BaseController = require('../../controllers/baseController');
const { noQueryParams, userValidation } = require('../middleware');

const UserController = new BaseController(User);

/* GET array of Users */
router
    .route('/users/:id?')
    .get(UserController.getObjectsWithPagination)
    .post(noQueryParams, userValidation, UserController.createOne)
    .get(UserController.getOneById)
    .put(UserController.updateOneById)
    .delete(UserController.deleteOneById);

module.exports = router;
