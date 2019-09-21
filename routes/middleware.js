const { body, sanitizeBody } = require('express-validator');

const timeRegex = /^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/;

const noQueryParams = (req, res, next) => {
    if (!req.params.id) {
        next(new Error('not found'));
    }
};

const userValidation = [
    body('first_name')
        .isString()
        .trim()
        .escape(),
    body('last_name')
        .isString()
        .trim()
        .escape(),
    body('username')
        .isString()
        .isLength({ max: 20 })
        .trim()
        .escape(),
    body('password').isString()
];

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
    body('motor_capacity')
        .isString()
        .trim()
        .escape(),
    body('car_class')
        .isString()
        .trim()
        .escape(),
    body('push_type')
        .isString()
        .trim()
        .escape(),
    body('remarks')
        .isString()
        .trim()
        .escape()
];

const driverValidation = [
    body('first_name')
        .isString()
        .trim()
        .escape(),
    body('last_name')
        .isString()
        .trim()
        .escape(),
    body('nationality')
        .isString()
        .trim()
        .escape(),
    body('address')
        .isString()
        .trim()
        .escape(),
    body('id_card_no')
        .isString()
        .isNumeric() // TODO: Check if this is the right way
        .trim()
        .escape(),
    body('mobile')
        .isString()
        .isNumeric()
        .trim()
        .escape(),
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('sponsor')
        .isString()
        .trim()
        .escape(),
    body('car_id').isInt(),
    body('remarks')
        .isString()
        .trim()
        .escape()
];

const rallyValidation = [
    body('name')
        .isString()
        .trim()
        .escape(),
    body('city')
        .isString()
        .trim()
        .escape(),
    body('date')
        .isString()
        .toDate()
        .trim()
        .escape(),
    body('type').isInt(),
    body('remarks')
        .isString()
        .trim()
        .escape()
];

const speedValidation = [
    body('rally_id').isInt(),
    body('driver_id').isInt(),
    body('racing_number').isInt(),
    body('time_1').matches(timeRegex),
    body('time_2').matches(timeRegex),
    body('time_3').matches(timeRegex),
    body('best_time').matches(timeRegex),
    body('fouls_1').isInt(),
    body('fouls_2').isInt(),
    body('fouls_3').isInt()
];

const driftValidation = [
    body('rally_id').isInt(),
    body('driver_id').isInt(),
    body('racing_number').isInt(),
    body('score_3').isInt(),
    body('score_1').isInt(),
    body('score_2').isInt(),
    body('fouls_1').isInt(),
    body('fouls_2').isInt(),
    body('fouls_3').isInt()
];

module.exports = {
    noQueryParams,
    userValidation,
    carValidation,
    driverValidation,
    rallyValidation,
    speedValidation,
    driftValidation
};
