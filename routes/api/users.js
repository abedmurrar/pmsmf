/* Express Router */
const express = require('express');

const router = express.Router();

/* Model */
const { User } = require('../../models');
const { BaseController } = require('../../controllers');
const { userValidation } = require('../middleware');

const UserController = new BaseController(User);

/* GET array of Users */
router
    .route('/users/:id?')
    .get(UserController.getObjectsWithPagination)
    .post(userValidation, UserController.createOne)
    .get(UserController.getOneById)
    .put(userValidation, UserController.updateOneById)
    .delete(UserController.deleteOneById);

module.exports = router;
