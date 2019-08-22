exports.up = function(knex) {
    return knex.schema.hasTable('speed_manage').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('speed_manage', function(table) {
                table.renameColumn('fouls', 'fouls_1');
                table.integer('fouls_2').nullable();
                table.integer('fouls_3').nullable();

            })
        }
    })
};

exports.down = function(knex) {
    knex.schema.table('speed_manage', function(table) {
        table.renameColumn('fouls_1', 'fouls');
        table.dropColumn('fouls_2');
        table.dropColumn('fouls_3');

    })
};