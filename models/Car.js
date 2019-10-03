const BaseModel = require('./BaseModel');

const CAR_CLASS_TYPES = ['A', 'B', 'C'];
const CAR_PUSH_TYPES = ['R', 'F', '4'];

class Car extends BaseModel {
    static get tableName() {
        return 'cars';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['manufacturer', 'model', 'car_class', 'push_type'],
            properties: {
                id: { type: 'integer' },
                manufacturer: { type: 'string' },
                model: { type: 'string' },
                year_of_production: { type: 'integer', pattern: '^[0-9]{4}$' },
                license_no: { type: 'string', pattern: '^[A-Za-z0-9]{6,7}$' },
                motor_capacity: { type: 'string' },
                car_class: { type: 'string', enum: CAR_CLASS_TYPES },
                push_type: { type: 'string', enum: CAR_PUSH_TYPES },
                remarks: { type: 'string' },
                is_active: { type: 'boolean', default: true }
            },
            additionalProperties: false
        };
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: BaseModel.HasManyRelation,
                modelClass: 'Driver',
                join: {
                    from: 'cars.id',
                    to: 'drivers.car_id'
                }
            }
        };
    }
}

module.exports = { Car, CAR_CLASS_TYPES, CAR_PUSH_TYPES };
