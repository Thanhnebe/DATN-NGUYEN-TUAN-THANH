'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('product', (table) => {
    table.increments('id').primary();
    table.string('nameProduct');
    table.string('image');
    table.double('price');
    table.double('originalPrice');
    table.double('cost');
    table.double('percentDiscount');
    table.text('description');
    table.integer('numberAvailable').defaultTo(0);
    table.jsonb('properties');
    table.jsonb('gallery').defaultTo(null);
    table.boolean('isActive').defaultTo(true);
    table.boolean('isHot').defaultTo(false);
    table.boolean('isBestSelling').defaultTo(false);
    table.integer('categoryId');
    table.integer('producerId');
    table.integer('stockQuantity');
    table.timestamp('productionDate'); 
    table.timestamp('expDate'); 
    table.timestamp('createdAt');
    table.timestamp('updatedAt');

    table.index('nameProduct');

  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE product CASCADE')
};
