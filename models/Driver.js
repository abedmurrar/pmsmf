const { Model } = require('objection');
const Car = require('./Car');

class Driver extends Model {
    static get tableName() {
        return 'drivers';
    }

    static get idColumn() {
        return 'id';
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
