
exports.up = function(knex) {
    return knex.schema.createTable('ProductInventory', (table) => {
        table.increments('id').primary(); 
        table.integer('productId').unsigned().notNullable(); 
        table.integer('stockQuantity').unsigned().notNullable().defaultTo(0); 
        table.integer('saleableQuantity').unsigned().notNullable().defaultTo(0);
        table.integer('price').unsigned().notNullable().defaultTo(0);
        table.foreign('productId').references('id').inTable('product').onDelete('CASCADE');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ProductInventory');
};
