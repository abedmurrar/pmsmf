/* eslint-disable max-classes-per-file */
const BaseModel = require('./BaseModel');

const RALLY_TYPES = ['S', 'D', '4'];

class Rally extends BaseModel {
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
                type: { type: 'string', enum: RALLY_TYPES },
                remarks: { type: 'string' },
                is_active: { type: 'boolean' }
            },
            additionalProperties: false
        };
    }

    static get relationMappings() {
        return {
            // TODO : this shouldn't be here, it shoud be in Speed and Drift
            drivers: {
                relation: BaseModel.HasManyRelation,
                modelClass: 'Driver',
                join: {
                    from: 'rallies.driver_id',
                    to: 'drivers.id'
                }
            },
            cars: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: 'Car',
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

module.exports = { Rally, RALLY_TYPES };
