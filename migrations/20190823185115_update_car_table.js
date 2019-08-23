/*
ALTER TABLE `pmsmf`.`speed_manage` 
ADD COLUMN `fouls` int(11) DEFAULT NULL AFTER `score_3`;

*/

exports.up = function(knex) {
    return knex.schema.hasTable('cars').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('cars', function(table) {
                table
                    .string('model', 20)
                    .notNullable()
                    .alter();
                table
                    .string('car_class', 6)
                    .notNullable()
                    .alter();
                table
                    .string('push_type', 10)
                    .notNullable()
                    .alter();
            });
        }
    });
};

exports.down = function(knex) {
    knex.schema.table('cars', function(table) {
        table
            .string('model', 20)
            .nullable()
            .alter();
        table
            .string('car_class', 6)
            .nullable()
            .alter();
        table
            .string('push_type', 10)
            .nullable()
            .alter();
    });
};
