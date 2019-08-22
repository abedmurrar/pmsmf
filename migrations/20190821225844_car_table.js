/*
CREATE TABLE `cars` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `manufacturer` varchar(20) NOT NULL,
  `model` varchar(20) DEFAULT NULL,
  `year_of_production` year(4) DEFAULT NULL,
  `license_no` varchar(10) DEFAULT NULL,
  `motor_capacity` varchar(10) DEFAULT NULL,
  `car_class` varchar(6) DEFAULT NULL,
  `push_type` varchar(10) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

*/

exports.up = function(knex) {
    return knex.schema.hasTable('cars').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('cars', function(table) {
                table.increments('id').primary().notNullable();
                table.string('manufacturer', 20).notNullable();
                table.string('model', 20).nullable();
                table.specificType('year_of_production', 'YEAR(4)').nullable();
                table.string('license_no', 10).nullable();
                table.string('motor_capacity', 10).nullable();
                table.string('car_class', 6).nullable();
                table.string('push_type', 10).nullable();
                table.string('remarks');

                table.charset('utf8');
                table.engine('InnoDB');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};