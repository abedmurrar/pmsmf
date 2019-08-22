/*
CREATE TABLE `drivers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `nationality` varchar(20) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  `id_card_no` varchar(9) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `sponsor` varchar(40) DEFAULT NULL,
  `car_id` int(11) unsigned DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `drivers_email_unique` (`email`),
  KEY `idcars_idx` (`car_id`),
  CONSTRAINT `idcars_idx` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

exports.up = function(knex) {
    return knex.schema.hasTable('drivers').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('drivers', function(table) {
                table.increments('id').primary().notNullable().unsigned();
                table.string('first_name', 20).notNullable();
                table.string('last_name', 20).notNullable();
                table.string('nationality', 20).nullable();
                table.string('address', 20).nullable();
                table.string('id_card_no', 9).nullable();
                table.string('mobile', 10).nullable();
                table.string('email', 30).unique().nullable();
                table.string('sponsor', 40).nullable();
                table.integer('car_id', 11).nullable().unsigned();
                table.string('remarks');

                table.foreign('car_id', 'idcars_idx')
                    .references('id')
                    .inTable('cars')
                    .onDelete('SET NULL')
                    .onUpdate('NO ACTION');

                table.charset('utf8');
                table.engine('InnoDB');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('drivers');
};