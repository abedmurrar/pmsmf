/*
CREATE TABLE `rally_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rally_type` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

*/

exports.up = function(knex) {
    return knex.schema.hasTable("rally_types").then(function(exists) {
        if (!exists) {
            return knex.schema.createTable("rally_types", function(table) {
                table
                    .increments("id")
                    .primary()
                    .notNullable();
                table.string("rally_type", 15).nullable();
                table.charset("utf8");
                table.engine("InnoDB");
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("rally_types");
};