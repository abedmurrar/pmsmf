exports.up = function(knex) {
    knex.schema.hasTable('rallies').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('rallies', function(table) {
                table.boolean('is_active').defaultTo(true);
            });
        }
    });

    knex.schema.hasTable('users').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('users', function(table) {
                table.boolean('is_active').defaultTo(true);
            });
        }
    });

    knex.schema.hasTable('drivers').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('drivers', function(table) {
                table.boolean('is_active').defaultTo(true);
            });
        }
    });

    knex.schema.hasTable('cars').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('cars', function(table) {
                table.boolean('is_active').defaultTo(true);
            });
        }
    });

    knex.schema.hasTable('speed_manage').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('speed_manage', function(table) {
                table.boolean('is_active').defaultTo(true);
            });
        }
    });

    return knex.schema.hasTable('drift_manage').then(function(exists) {
        if (exists) {
            return knex.schema.alterTable('drift_manage', function(table) {
                table.boolean('is_active').defaultTo(true);
            });
        }
    });
};

exports.down = function(knex) {
    knex.schema.table('rallies', function(table) {
        table.dropColumn('is_active');
    });

    knex.schema.table('cars', function(table) {
        table.dropColumn('is_active');
    });

    knex.schema.table('users', function(table) {
        table.dropColumn('is_active');
    });

    knex.schema.table('drivers', function(table) {
        table.dropColumn('is_active');
    });

    knex.schema.table('speed_manage', function(table) {
        table.dropColumn('is_active');
    });

    return knex.schema.table('drift_manage', function(table) {
        table.dropColumn('is_active');
    });
};
