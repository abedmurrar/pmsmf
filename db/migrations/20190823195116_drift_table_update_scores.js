exports.up = function(knex) {
    return knex.schema.hasTable('drift_manage').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('drift_manage', function(table) {
                table
                    .integer('score_1')
                    .nullable()
                    .alter();
                table
                    .integer('score_2')
                    .nullable()
                    .alter();
                table
                    .integer('score_3')
                    .nullable()
                    .alter();
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.table('drift_manage', function(table) {
        table
            .integer('score_1')
            .notNullable()
            .alter();
        table
            .integer('score_2')
            .notNullable()
            .alter();
        table
            .integer('score_3')
            .notNullable()
            .alter();
    });
};
