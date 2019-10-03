/*
CREATE TABLE `drift_manage` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rally_id` int(10) unsigned NOT NULL,
  `driver_id` int(10) unsigned NOT NULL,
  `racing_number` int(10) unsigned NOT NULL,
  `score_1` int(11) NOT NULL,
  `score_2` int(11) NOT NULL,
  `score_3` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rally_id_fk_idx` (`rally_id`),
  KEY `driver_id_fk_idx` (`driver_id`),
  CONSTRAINT `driver_id_fk_idx` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `rally_id_fk_idx` FOREIGN KEY (`rally_id`) REFERENCES `rallies` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

*/

exports.up = function(knex) {
    return knex.schema.hasTable('drift_manage').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('drift_manage', function(table) {
                table
                    .increments('id')
                    .primary()
                    .notNullable();
                table
                    .integer('rally_id')
                    .notNullable()
                    .unsigned();
                table
                    .integer('driver_id')
                    .notNullable()
                    .unsigned();
                table
                    .integer('racing_number')
                    .notNullable()
                    .unsigned();
                table.integer('score_1').nullable();
                table.integer('score_2').nullable();
                table.integer('score_3').nullable();
                table.integer('fouls_1').nullable();
                table.integer('fouls_2').nullable();
                table.integer('fouls_3').nullable();
                table.boolean('is_active').defaultTo(true);
                table
                    .dateTime('created_at')
                    .notNullable()
                    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
                table
                    .dateTime('updated_at')
                    .notNullable()
                    .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
                table.unique(['rally_id', 'racing_number', 'is_active']);

                table
                    .foreign('rally_id', 'rally_id_fk_idx')
                    .references('id')
                    .inTable('rallies')
                    .onDelete('CASCADE')
                    .onUpdate('NO ACTION');

                table
                    .foreign('driver_id', 'driver_id_fk_idx')
                    .references('id')
                    .inTable('drivers')
                    .onDelete('CASCADE')
                    .onUpdate('NO ACTION');

                table.charset('utf8');
                table.engine('InnoDB');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('drift_manage');
};
