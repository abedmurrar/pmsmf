exports.up = function(knex) {
    return knex.schema.hasTable('users').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('users', function(table) {
                table
                    .increments('id')
                    .primary()
                    .notNullable();
                table.string('username').notNullable();
                table.string('first_name').notNullable();
                table.string('last_name').notNullable();
                table.string('password').notNullable();
                table.string('salt').notNullable();
                table.boolean('is_active').defaultTo(true);
                table.timestamps();

                table.charset('utf8');
                table.engine('InnoDB');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
