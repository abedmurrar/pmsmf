const { Model } = require('objection');
const knex = require('../db/config');
const Car = require('./Car');

Model.knex(knex);

class Driver extends Model {
    static get tableName() {
        return 'drivers';
    }

    static get relationMappings() {
        return {
            car: {
                relation: Model.HasOneRelation,
                modelClass: Car,
                join: {
                    from: 'drivers.car_id',
                    to: 'cars.id'
                }
            }
        };
    }

    async createSchema() {

        // Create table
        await knex.schema.createTableIfNotExists('drivers', table => {
            table.increments('id').primary().notNullable();
            table.string('first_name', 20).notNullable();
            table.string('last_name', 20).notNullable();
            table.string('nationality', 20).nullable();
            table.string('address', 20).nullable();
            table.string('id_card_no', 9).nullable();
            table.string('mobile', 10).nullable();
            table.string('email', 30).unique().nullable();
            table.string('sponsor', 40).nullable();
            table.integer('car_id', 11).nullable();
            table.string('remarks');

            table.foreign('car_id', 'idcars_idx')
                .references('id')
                .inTable('cars')
                .onDelete('SET NULL')
                .onUpdate('NO ACTION');

            table.charset('utf8_general_ci');
            table.engine('InnoDB');
        });
    }
}