exports.up = function(knex) {
    knex.schema.hasTable('rallies').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('rallies', function(table) {
                table.datetime('created_at');
                table.datetime('updated_at');
            });
        }
    });

    knex.schema.hasTable('users').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('users', function(table) {
                table.datetime('created_at');
                table.datetime('updated_at');
            });
        }
    });

    knex.schema.hasTable('drivers').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('drivers', function(table) {
                table.datetime('created_at');
                table.datetime('updated_at');
            });
        }
    });

    knex.schema.hasTable('cars').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('cars', function(table) {
                table.datetime('created_at');
                table.datetime('updated_at');
            });
        }
    });

    knex.schema.hasTable('speed_manage').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('speed_manage', function(table) {
                table.datetime('created_at');
                table.datetime('updated_at');
            });
        }
    });

    return knex.schema.hasTable('drift_manage').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('drift_manage', function(table) {
                table.datetime('created_at');
                table.datetime('updated_at');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema
        .table('rallies', function(table) {
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
        })
        .table('cars', function(table) {
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
        })
        .table('users', function(table) {
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
        })
        .table('drivers', function(table) {
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
        })
        .table('speed_manage', function(table) {
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
        })
        .table('drift_manage', function(table) {
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
        });
};
