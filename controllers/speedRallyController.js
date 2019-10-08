// const { check, validationResult } = require('express-validator');
// eslint-disable-next-line no-unused-vars
const { Model } = require('objection');
// eslint-disable-next-line no-unused-vars
const express = require('express');
const HTTPStatus = require('./status_codes');

class SpeedRallyController {
    /**
     *
     * Initializes a new Controller for an objection model
     * @constructor
     * @param {Model} model
     */
    constructor(model) {
        this.model = model;
        this.getAll = this.getAll.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.createOne = this.createOne.bind(this);
        this.deleteOneById = this.deleteOneById.bind(this);
        this.updateOneById = this.updateOneById.bind(this);
    }

    /**
     *
     * @param {express.request} req
     * @param {express.response} res
     * @param {Function} next
     */
    async getAll(req, res, next) {
        if (req.params.id) {
            return next();
        }
        try {
            const objects = await this.model
                .query()
                .select()
                .where('is_active', true)
                .andWhere('rally_id', req.params.rallyId);
            res.json({
                data: objects
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     *
     * @param {express.request} req
     * @param {express.response} res
     * @param {Function} next
     */
    async getOneById(req, res, next) {
        try {
            const object = await this.model
                .query()
                .findById(req.params.id)
                .where('is_active', true)
                .andWhere('rally_id', req.params.rallyId)
                .throwIfNotFound();
            res.json(object);
        } catch (err) {
            next(err);
        }
    }

    /**
     *
     * @param {express.request} req
     * @param {express.response} res
     * @param {Function} next
     */
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

    /**
     *
     * @param {express.request} req
     * @param {express.response} res
     * @param {Function} next
     */
    async deleteOneById(req, res, next) {
        try {
            await this.model
                .query()
                .where('rally_id', req.params.rallyId)
                .patchAndFetchById(req.params.id, { is_active: false })
                .throwIfNotFound();
            res.status(HTTPStatus.NO_CONTENT).json(null);
        } catch (err) {
            next(err);
        }
    }

    /**
     *
     * @param {express.request} req
     * @param {express.response} res
     * @param {Function} next
     */
    async updateOneById(req, res, next) {
        try {
            const updateObject = await this.model
                .query()
                .patchAndFetchById(req.params.id, req.body)
                .where('is_active', true)
                .andWhere('rally_id', req.params.rallyId)
                .throwIfNotFound();
            res.status(HTTPStatus.OK).json(updateObject);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = SpeedRallyController;
