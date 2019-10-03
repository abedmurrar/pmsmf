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
                table
                    .increments('id')
                    .primary()
                    .notNullable();
                table.string('manufacturer').notNullable();
                table.string('model').notNullable();
                table.specificType('year_of_production', 'YEAR(4)').nullable();
                table.string('license_no').nullable();
                table.string('motor_capacity').nullable();
                table.string('car_class').notNullable();
                table.string('push_type').notNullable();
                table.text('remarks');
                table.boolean('is_active').defaultTo(true);
                table
                    .dateTime('created_at')
                    .notNullable()
                    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
                table
                    .dateTime('updated_at')
                    .notNullable()
                    .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
                table.charset('utf8');
                table.engine('InnoDB');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
