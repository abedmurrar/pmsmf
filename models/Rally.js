const { Model } = require('objection');
const knex = require('../db/config');
const Driver = require('./Driver');

Model.knex(knex);

class Rally extends Model {
    static get tableName() {
        return 'rallies';
    }

    // static get relationMappings() {
    //     return {
    //         drivers: {
    //             relation: Model.HasManyRelation,
    //             modelClass: Driver,
    //             join: {
    //                 from: 'drivers.car_id',
    //                 to: 'cars.id'
    //             }
    //         }
    //     };
    // }

    async createSchema() {

        await knex.schema.createTableIfNotExists('rally_types', table => {
            table.increments('id').primary().notNullable();
            table.string('rally_type', 15).nullable();
            table.charset('utf8_general_ci');
            table.engine('InnoDB');
        }).then(() => {
            return knex('rally_types').insert([
                { id: 1, rally_type: 'speed' },
                { id: 2, rally_type: 'drift' },
                { id: 3, rally_type: '4x4' }
            ])
        });

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