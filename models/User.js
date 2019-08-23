const { Model } = require("objection");

class User extends Model {
    static get tableName() {
        return "users";
    }
    static get idColumn() {
        return "id";
    }

    // static get relationMappings() {
    //     return {
    //         drivers: {
    //             relation: Model.HasManyRelation,
    //             modelClass: Driver,
    //             join: {
    //                 from: 'cars.id',
    //                 to: 'drivers.car_id'
    //             }
    //         }
    //     };
    // }
}

module.exports = User;