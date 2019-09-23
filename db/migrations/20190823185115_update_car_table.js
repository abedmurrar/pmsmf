/*
ALTER TABLE `pmsmf`.`speed_manage` 
ADD COLUMN `fouls` int(11) DEFAULT NULL AFTER `score_3`;

*/

exports.up = function(knex) {
    return knex.schema.hasTable('cars').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('cars', function(table) {
                table
                    .string('model')
                    .notNullable()
                    .alter();
                table
                    .string('car_class')
                    .notNullable()
                    .alter();
                table
                    .string('push_type')
                    .notNullable()
                    .alter();
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.table('cars', function(table) {
        table
            .string('model')
            .nullable()
            .alter();
        table
            .string('car_class')
            .nullable()
            .alter();
        table
            .string('push_type')
            .nullable()
            .alter();
    });
};
