const noQueryParams = (req, res, next) => {
    console.log(!!req.params.id);
    if (!req.params.id) {
        console.log('no id');
        next(new Error('not found'));
    }
};

module.exports = { noQueryParams };
