const { Model } = require('objection');
const Driver = require('./Driver');
const Car = require('./Car');

class Rally extends Model {
    static get tableName() {
        return 'rallies';
    }

    static get idColumn() {
        return 'id';
    }

    static get useLimitInFirst() {
        return true;
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
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'rallies.driver_id',
                    to: 'drivers.id'
                }
            },
            cars: {
                relation: Model.ManyToManyRelation,
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
