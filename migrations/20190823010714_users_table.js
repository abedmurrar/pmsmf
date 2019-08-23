exports.up = function(knex) {
    return knex.schema.hasTable('users').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('users', function(table) {
                table
                    .increments('id')
                    .primary()
                    .notNullable();
                table.string('username', 20).notNullable();
                table.string('first_name', 20).notNullable();
                table.string('last_name', 20).notNullable();
                table.string('password', 255).notNullable();
                table.string('salt', 20).notNullable();

                table.charset('utf8');
                table.engine('InnoDB');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
