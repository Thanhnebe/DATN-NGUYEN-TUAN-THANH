
exports.up = function(knex) {
    return knex.schema.createTable('promotionProducts', (table) => {
        table.increments('id').primary();
        table.integer('promotionId');
        table.integer('productId');
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('promotionProducts');
};
