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
    sanitizeBody('year_of_production').toInt(),
    body('license_no').matches('^[A-Za-z0-9]{6,7}$'),
    body('motor_capacity')
        .isString()
        .trim()
        .escape(),
    body('car_class')
        .isString()
        .trim(),
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
    sanitizeBody('car_id').toInt(),
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
    sanitizeBody('rally_id').toInt(),
    body('driver_id').isInt(),
    sanitizeBody('driver_id').toInt(),
    body('racing_number').isInt(),
    sanitizeBody('racing_number').toInt(),
    body('time_1').matches(timeRegex),
    body('time_2').matches(timeRegex),
    body('time_3').matches(timeRegex),
    body('best_time').matches(timeRegex),
    body('fouls_1').isInt(),
    sanitizeBody('fouls_1').toInt(),
    body('fouls_2').isInt(),
    sanitizeBody('fouls_2').toInt(),
    body('fouls_3').isInt(),
    sanitizeBody('fouls_3').toInt()
];

const driftValidation = [
    body('rally_id').isInt(),
    sanitizeBody('rally_id').toInt(),
    body('driver_id').isInt(),
    sanitizeBody('driver_id').toInt(),
    body('racing_number').isInt(),
    sanitizeBody('racing_number').toInt(),
    body('score_1').isInt(),
    sanitizeBody('score_1').toInt(),
    body('score_2').isInt(),
    sanitizeBody('score_2').toInt(),
    body('score_3').isInt(),
    sanitizeBody('score_3').toInt(),
    body('fouls_1').isInt(),
    sanitizeBody('fouls_1').toInt(),
    body('fouls_2').isInt(),
    sanitizeBody('fouls_2').toInt(),
    body('fouls_3').isInt(),
    sanitizeBody('fouls_3').toInt(),
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
