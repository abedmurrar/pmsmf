const { Model } = require("objection");
const Driver = require("./Driver");

class Car extends Model {
    static get tableName() {
        return "cars";
    }
    static get idColumn() {
        return "id";
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: "cars.id",
                    to: "drivers.car_id"
                }
            }
        };
    }
}

module.exports = Car;