"use strict";

const Boom = require("@hapi/boom");
const Models = require("../../db/models");
const BaseServiceCRUD = require("../../base/BaseServiceCRUD");

class RatingService extends BaseServiceCRUD {
  constructor() {
    super(Models.Rating, "Rating");
  }

  async createOne(productId, userId, payload) {
    payload.userId = userId;
    payload.productId = productId;
    const orderList = await Models.Order.query()
      .where("userId", userId)
      .andWhere("status", "Complete")
      .select("id");

    // Chặn đánh giá khi chưa đặt hàng
    if (!orderList || orderList.length === 0) {
      throw new Boom.badRequest("Bạn phải hoàn thành đơn hàng trước khi đánh giá");
    }

    const orderIds = orderList.map((order) => order.id);

    const hasExist = await Models.OrderDetail.query()
      .whereIn("orderId", orderIds)
      .andWhere("productId", productId)
      .first();

    if (!hasExist) {
      throw new Boom.badRequest("Bạn phải đặt hàng trước khi đánh giá");
    }

    const existingRating = await this.model
      .query()
      .where("userId", userId)
      .andWhere("productId", productId)
      .first();

    if (existingRating) {
      throw new Boom.badRequest(
        "Bạn chỉ có thể đánh giá sản phẩm này một lần."
      );
    }

    return this.model
      .query()
      .insert(payload)
      .where()
      .returning("*")
      .withGraphFetched("user");
  }

  async getMany(query, productId) {
    const builder = this.model
      .queryBuilder(query)
      .where({ productId })
      .withGraphFetched("user");
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }
  async getAll(query) {
    const builder = this.model
      .queryBuilder(query)
      .withGraphFetched("[products, user]");
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  getSearchQuery(builder, q) {
    builder
      .innerJoin("users", "rating.userId", "=", "users.id")
      .innerJoin("product", "rating.productId", "=", "product.id")
      .whereRaw("LOWER(\"email\") LIKE '%' || LOWER(?) || '%' ", q)
      .orWhereRaw("LOWER(\"nameProduct\") LIKE '%' || LOWER(?) || '%' ", q);
  }
}

module.exports = RatingService;
