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
                table.increments('id').primary().notNullable();
                table.integer('rally_id').notNullable().unsigned();
                table.integer('driver_id').notNullable().unsigned();
                table.integer('racing_number').notNullable().unsigned();
                table.time('time_1', { precision: 6 }).notNullable();
                table.time('time_2', { precision: 6 }).notNullable();
                table.time('time_3', { precision: 6 }).notNullable();
                table.time('best_time', { precision: 6 }).notNullable();

                table.foreign('rally_id', 'speed_rally_id_fk_idx')
                    .references('id')
                    .inTable('rallies')
                    .onDelete('CASCADE')
                    .onUpdate('NO ACTION');

                table.foreign('driver_id', 'speed_driver_id_fk_idx')
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