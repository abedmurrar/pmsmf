/* eslint-disable max-classes-per-file */
const BaseModel = require('./BaseModel');
const Driver = require('./Driver');
const Car = require('./Car');
const { Model, QueryBuilder, ValidationError } = require('objection');

class SelectWithJoin extends QueryBuilder {
    // select() {
    //     return this.join('rally_types', 'rallies.type', `rally_types.id`);
    // }
}

class Rally extends BaseModel {
    // static get QueryBuilder() {
    //     return SelectWithJoin;
    // }

    static get tableName() {
        return 'rallies';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                city: { type: 'string' },
                date: { type: 'string', format: 'date' },
                type: { type: 'integer' },
                remarks: { type: 'string' }
            },
            additionalProperties: false
        };
    }

    static get relationMappings() {
        return {
            // TODO : this shouldn't be here, it shoud be in Speed and Drift
            drivers: {
                relation: BaseModel.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'rallies.driver_id',
                    to: 'drivers.id'
                }
            },
            cars: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: Car,
                join: {
                    from: 'rallies.driver_id',
                    through: {
                        from: 'drivers.id',
                        to: 'drivers.car_id'
                    },
                    to: 'cars.id'
                }
            }
        };
    }
}

module.exports = Rally;
