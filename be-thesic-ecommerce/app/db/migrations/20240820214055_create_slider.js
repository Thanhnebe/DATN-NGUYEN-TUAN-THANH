'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('slider', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.boolean('isActive').defaultTo(false);
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE slider CASCADE')
};
