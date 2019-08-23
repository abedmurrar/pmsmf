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

    static get relationMappings() {
        return {
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
