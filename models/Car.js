const { Model } = require('objection');
const Driver = require('./Driver');

class Car extends Model {
    static get tableName() {
        return 'cars';
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
            required: ['manufacturer', 'model', 'car_class', 'push_type'],
            properties: {
                id: { type: 'integer' },
                manufacturer: { type: 'string' },
                model: { type: 'string' },
                year_of_production: { type: 'integer' },
                license_no: { type: 'string', pattern: '^[A-Za-z0-9]{6,7}$' },
                motor_capacity: { type: 'string' },
                car_class: { type: 'string' }, // TODO: figure out this shit
                push_type: { type: 'string' },
                remarks: { type: 'string' }
            },
            additionalProperties: false
        };
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'cars.id',
                    to: 'drivers.car_id'
                }
            }
        };
    }
}

module.exports = Car;
