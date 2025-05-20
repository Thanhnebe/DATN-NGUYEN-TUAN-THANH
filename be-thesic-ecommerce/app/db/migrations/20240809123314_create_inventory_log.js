exports.up = function(knex) {
    return knex.schema.createTable('InventoryLogs', (table) => {
      table.increments('id').primary(); // Primary key for the log entry
      table.integer('productID').unsigned().notNullable(); // ID of the product
      table.integer('userID').unsigned().notNullable(); // ID of the user performing the action
      table.integer('orderID').unsigned().nullable(); // ID of the related order (if applicable)
      table.text('description').notNullable(); // Description of the log entry
      table.integer('oldQuantity').unsigned().notNullable(); // Quantity before the change
      table.integer('newQuantity').unsigned().notNullable(); // Quantity after the change
      table.double('price').nullable(); // Price associated with the change (if applicable)
      table.timestamp('createdAt').defaultTo(knex.fn.now()); // Timestamp of the log entry
  
      // Foreign key constraints
      // table.foreign('productID').references('id').inTable('product').onDelete('CASCADE');
      // table.foreign('userID').references('id').inTable('users').onDelete('CASCADE');
      // table.foreign('orderID').references('id').inTable('order').onDelete('SET NULL');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('InventoryLogs');
  };
  