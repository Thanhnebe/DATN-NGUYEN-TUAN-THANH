'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('banner', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('imageUrl');
        table.string('targetUrl');
        table.boolean('isActive').defaultTo(false);
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE banner CASCADE')
};
