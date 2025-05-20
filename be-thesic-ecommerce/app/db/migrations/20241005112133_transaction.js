'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('transaction', (table) => {
        table.increments('id').primary();
        table.string('orderId');
        table.string('transactionCode');
        table.integer('amount');
        table.string('status');
        table.string('paymentDate');
        table.string('type')
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE transaction CASCADE')
};
