const { Model } = require('objection');
const knex = require('../db/config');
const Driver = require('./Driver');

Model.knex(knex);

class Car extends Model {
    constructor() {
        super();
        console.log('k')
    }
    static get tableName() {
        return 'cars';
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
                    from: 'cars.id',
                    to: 'drivers.car_id'
                }
            }
        };
    }

    async createSchema() {


        // Create table
        await knex.schema.createTableIfNotExists('drivers', table => {
            table.increments('id').primary().notNullable();
            table.string('manufacturer', 20).notNullable();
            table.string('model', 20).nullable();
            table.specificType('year_of_production', 'YEAR(4)').nullable();
            table.string('license_no', 10).nullable();
            table.string('motor_capacity', 10).nullable();
            table.string('car_class', 6).nullable();
            table.string('push_type', 10).nullable();
            table.string('remarks');

            table.charset('utf8_general_ci');
            table.engine('InnoDB');
        });
    }
}