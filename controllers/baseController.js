const HTTPStatus = require('../routes/status_codes');

// const { check, validationResult } = require('express-validator');

class BaseController {
    constructor(model) {
        this.model = model;
        this.getObjectsWithPagination = this.getObjectsWithPagination.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.createOne = this.createOne.bind(this);
        this.deleteOneById = this.deleteOneById.bind(this);
        this.updateOneById = this.updateOneById.bind(this);
    }

    async getObjectsWithPagination(req, res, next) {
        if (req.params.id) {
            return next();
        }
        try {
            const objects = await this.model.query().selectWithPagination(req.query);
            res.json({
                data: objects,
                draw: req.query.draw,
                recordsTotal: objects.total,
                recordsFiltered: objects.total
            });
        } catch (err) {
            next(err);
        }
    }

    async getOneById(req, res, next) {
        try {
            const object = await this.model
                .query()
                .findById(req.params.id)
                .where('is_active', true)
                .throwIfNotFound();
            res.json(object);
        } catch (err) {
            next(err);
        }
    }

    async createOne(req, res, next) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({ errors: errors.array() });
        // }
        try {
            const createdObject = await this.model.query().insertGraphAndFetch(req.body);
            res.status(HTTPStatus.CREATED).json(createdObject);
        } catch (err) {
            next(err);
        }
    }

    async deleteOneById(req, res, next) {
        try {
            await this.model
                .query()
                .patch({ is_active: false })
                .findById(req.params.id)
                .throwIfNotFound();
            res.status(HTTPStatus.NO_CONTENT).json(null);
        } catch (err) {
            next(err);
        }
    }

    async updateOneById(req, res, next) {
        try {
            const updateObject = await this.model
                .query()
                .patchAndFetchById(req.params.id, req.body)
                .where('is_active', true)
                .throwIfNotFound();
            res.status(HTTPStatus.OK).json(updateObject);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = BaseController;
