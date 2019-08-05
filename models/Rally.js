const { Model } = require('objection');
const knex = require('../db/config');
const Driver = require('./Driver');

Model.knex(knex);

class Rally extends Model {
    static get tableName() {
        return 'rallies';
    }
    static get idColumn() {
            return 'id';
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
            table.string('name', 30).notNullable();
            table.string('city', 20).nullable();
            table.date('date').nullable();
            table.integer('type', 11).nullable();
            table.string('remarks');

            table.foreign('type', 'rally_type_fk_idx')
                .references('id')
                .inTable('rally_types')
                .onDelete('NO ACTION')
                .onUpdate('NO ACTION');

            table.charset('utf8_general_ci');
            table.engine('InnoDB');
        });
    }
}