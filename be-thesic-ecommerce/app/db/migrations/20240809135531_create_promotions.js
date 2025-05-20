exports.up = function (knex) {
  return knex.schema.createTable("Promotions", (table) => {
    table.increments("id").primary();
    table.text("promotionName").notNullable();
    table.text("type").notNullable();  // productDiscount, giftWithPurchase, orderDiscount, shippingDiscount
    table.double('discountValue');
    table.text("discountType");
    table.integer("minQuantity");
    table.jsonb("giftProduct");
    table.timestamp('startDate');
    table.timestamp('endDate');
    table.text("image");
    table.text("description");
    table.boolean('isActive').defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Promotions");
};
