'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('slider_item', (table) => {
        table.increments('id').primary();
        table.string('sliderId');
        table.string('imageUrl');
        table.string('targetUrl');
        table.string('numberOrder');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE slider_item CASCADE')
};
