const BaseModel = require('./BaseModel');

class Driver extends BaseModel {
    static get tableName() {
        return 'drivers';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['first_name', 'last_name'],
            properties: {
                id: { type: 'integer' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                nationality: { type: 'string' },
                address: { type: 'string' },
                id_card_no: { type: 'string', pattern: '^[0-9]+$' },
                mobile: { type: 'string', pattern: '^[0-9]+$' },
                email: { type: 'string', format: 'email' },
                sponsor: { type: 'string' },
                car_id: { type: 'integer' },
                remarks: { type: 'string' }
            },
            additionalProperties: false
        };
    }

    static get relationMappings() {
        return {
            car: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: 'Car',
                join: {
                    from: 'drivers.car_id',
                    to: 'cars.id'
                }
            }
        };
    }
}

module.exports = Driver;
