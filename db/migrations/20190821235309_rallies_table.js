/*
CREATE TABLE `rallies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `city` varchar(20) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `type` int(11) unsigned DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rally_type_fk_idx` (`type`),
  CONSTRAINT `rally_type_fk_idx` FOREIGN KEY (`type`) REFERENCES `rally_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

*/

exports.up = function(knex) {
    return knex.schema.hasTable('rallies').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('rallies', function(table) {
                table
                    .increments('id')
                    .primary()
                    .notNullable();
                table.string('name').notNullable();
                table.string('city').nullable();
                table.date('date').nullable();
                table
                    .integer('type', 11)
                    .nullable()
                    .unsigned();
                table.string('remarks');

                table
                    .foreign('type', 'rally_type_fk_idx')
                    .references('id')
                    .inTable('rally_types')
                    .onDelete('NO ACTION')
                    .onUpdate('NO ACTION');

                table.charset('utf8');
                table.engine('InnoDB');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('rallies');
};
