'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('notification', (table) => {
        table.increments('id').primary();
        table.string('title');
        table.string('description');
        table.integer('userId');
        table.boolean('viewed').defaultTo(false);
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE notification CASCADE')
};
