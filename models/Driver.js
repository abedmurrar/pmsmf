const { Model } = require('objection');
const Car = require('./Car');

class Driver extends Model {
    static get tableName() {
        return 'drivers';
    }

    static get idColumn() {
        return 'id';
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
                email: { type: 'string', format: 'email' }, // TODO: figure out this shit
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
                relation: Model.BelongsToOneRelation,
                modelClass: Car,
                join: {
                    from: 'drivers.car_id',
                    to: 'cars.id'
                }
            }
        };
    }
}

module.exports = Driver;
