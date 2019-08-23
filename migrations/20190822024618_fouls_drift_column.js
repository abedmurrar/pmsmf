/*
ALTER TABLE `pmsmf`.`drift_manage` 
ADD COLUMN `fouls` int(11) DEFAULT NULL AFTER `score_3`;

*/

exports.up = function(knex) {
    return knex.schema.hasTable("drift_manage").then(function(exists) {
        if (exists) {
            return knex.schema.alterTable("drift_manage", function(table) {
                table.integer("fouls").nullable();
            });
        }
    });
};

exports.down = function(knex) {
    knex.schema.table("drift_manage", function(table) {
        table.dropColumn("fouls");
    });
};