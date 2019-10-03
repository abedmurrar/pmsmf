/*
CREATE TABLE `speed_manage` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rally_id` int(10) unsigned NOT NULL,
  `driver_id` int(10) unsigned NOT NULL,
  `racing_number` int(10) unsigned NOT NULL,
  `time_1` time(6) NOT NULL,
  `time_2` time(6) NOT NULL,
  `time_3` time(6) NOT NULL,
  `best_time` time(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `speed_rally_id_fk_idx` (`rally_id`),
  KEY `speed_driver_id_fk_idx` (`driver_id`),
  CONSTRAINT `speed_driver_id_fk_idx` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `speed_rally_id_fk_idx` FOREIGN KEY (`rally_id`) REFERENCES `rallies` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

*/

exports.up = function(knex) {
    return knex.schema.hasTable('speed_manage').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('speed_manage', function(table) {
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
                table.time('time_1', 2).nullable();
                table.time('time_2', 2).nullable();
                table.time('time_3', 2).nullable();
                table.time('best_time', 2).nullable();
                table.integer('fouls_1').nullable();
                table.integer('fouls_2').nullable();
                table.integer('fouls_3').nullable();
                table.boolean('is_active').defaultTo(true);
                table.timestamps();

                table.unique(['rally_id', 'racing_number', 'is_active']);
                table
                    .foreign('rally_id', 'speed_rally_id_fk_idx')
                    .references('id')
                    .inTable('rallies')
                    .onDelete('CASCADE')
                    .onUpdate('NO ACTION');

                table
                    .foreign('driver_id', 'speed_driver_id_fk_idx')
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
    return knex.schema.dropTableIfExists('speed_manage');
};
