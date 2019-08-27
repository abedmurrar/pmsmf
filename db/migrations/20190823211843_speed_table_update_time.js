exports.up = function(knex) {
    return knex.schema.hasTable('speed_manage').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('speed_manage', function(table) {
                table
                    .time('time_1', 2)
                    .nullable()
                    .alter();
                table
                    .time('time_2', 2)
                    .nullable()
                    .alter();
                table
                    .time('time_3', 2)
                    .nullable()
                    .alter();
                table
                    .time('best_time', 2)
                    .nullable()
                    .alter();
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.table('speed_manage', function(table) {
        table
            .time('time_1', 6)
            .notNullable()
            .alter();
        table
            .time('time_2', 6)
            .notNullable()
            .alter();
        table
            .time('time_3', 6)
            .notNullable()
            .alter();
        table
            .time('best_time', 6)
            .notNullable()
            .alter();
    });
};
