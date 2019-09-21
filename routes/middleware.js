const { body, sanitizeBody } = require('express-validator');

const noQueryParams = (req, res, next) => {
    console.log(!!req.params.id);
    if (!req.params.id) {
        console.log('no id');
        next(new Error('not found'));
    }
};

const carValidation = [
    body('manufacturer')
        .isString()
        .trim()
        .escape(),
    body('model')
        .isString()
        .trim()
        .escape(),
    body('year_of_production').matches('^[0-9]{4}$'),
    body('license_no').matches('^[A-Za-z0-9]{6,7}$'),
    body('car_class')
        .isString()
        .trim()
        .escape(),
    body('push_type')
        .isString()
        .trim()
        .escape()
];

module.exports = { noQueryParams, carValidation };
