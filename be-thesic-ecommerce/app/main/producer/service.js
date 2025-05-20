"use strict";

const Models = require("../../db/models");
const BaseServiceCRUD = require("../../base/BaseServiceCRUD");

class ProducerService extends BaseServiceCRUD {
  constructor() {
    super(Models.Producer, "Producer");
  }

  async getMany(query) {
    const builder = this.model
      .queryBuilder(query)
      .withGraphFetched("categories");
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    await builder.orderBy("createdAt", "desc");
    return builder;
  }

  async getManyByCategoryId(query, id) {
    const builder = this.model
      .queryBuilder(query)
      .withGraphFetched("categories")
      .where("categoryId", id);
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw("LOWER(\"name\") LIKE '%' || LOWER(?) || '%' ", q);
    });
  }

  async deleteOne(id) {
    const hasProduct = await Models.Product.query()
      .where("producerId", id)
      .resultSize();
    if (hasProduct > 0)
      return {
        success: false,
        message: "Không thể xóa nhà cung cấp đã phát sinh sản phẩm",
      };
      else {
        await Models.Producer.query().deleteById(id);
        return { success: true };
      }
   
  }
}

module.exports = ProducerService;
