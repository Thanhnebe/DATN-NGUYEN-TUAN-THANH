"use strict";
const Models = require("../../db/models");
const BaseServiceCRUD = require("../../base/BaseServiceCRUD");
const Boom = require("@hapi/boom");
const moment = require("moment");

class PromotionService extends BaseServiceCRUD {
  constructor() {
    super(Models.Promotion, "Promotion");
  }

  async createOne(payload) {
    const { productIds, giftProduct, ...promotionData } = payload;
    const productIdsAsJson = JSON.stringify(giftProduct);
    const promotionCreated = await this.model
      .query()
      .insert({ ...promotionData, giftProduct: productIdsAsJson })
      .returning("*");

    const promotionProducts = await Promise.all(
      productIds.map(async (productId) => {
        const promotionProduct = await Models.PromotionProduct.query().insert({
          promotionId: promotionCreated.id,
          productId,
        });
        return promotionProduct;
      })
    );

    return { ...promotionCreated, promotionProducts };
  }

  async updateOne(id, payload) {
    const { productIds, giftProduct, ...promotionData } = payload;
    const productIdsAsJson = JSON.stringify(giftProduct);
    const result = await this.model.query().patchAndFetchById(id, {
      ...promotionData,
      giftProduct: productIdsAsJson,
    });

    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }

    const existingProducts = await Models.PromotionProduct.query()
      .select("productId")
      .where("promotionId", result.id)
      .pluck("productId");

    const productIdsToDelete = existingProducts.filter(
      (id) => !productIds.includes(id)
    );

    const productIdsToAdd = productIds.filter(
      (id) => !existingProducts.includes(id)
    );

    if (productIdsToDelete.length > 0) {
      await Models.PromotionProduct.query()
        .whereIn("productId", productIdsToDelete)
        .andWhere("promotionId", result.id)
        .delete();
    }

    if (productIdsToAdd.length > 0) {
      const promotionProductsToAdd = productIdsToAdd.map((productId) => ({
        productId,
        promotionId: result.id,
      }));
      await Models.PromotionProduct.query().insert(promotionProductsToAdd);
    }

    return result;
  }

  async getOne(id) {
    const result = await this.model.query().findById(id);
    const promotionProduct = await Models.PromotionProduct.query()
      .where("promotionId", id)
      .returning("productId")
      .withGraphFetched("product");
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return { result, productApply: promotionProduct };
  }

  async deleteOne(id) {
    await Promise.all([
      this.model.query().deleteById(id),
      Models.PromotionProduct.query().andWhere("promotionId", id).delete(),
    ]);
    return { success: true };
  }

  // api display promotion banner
  async getBanner() {
    const currentDate = moment();
    const promotion = await this.model
      .query()
      .where("isActive", true)
      .whereBetween("startDate", [
        currentDate.startOf("day").toDate(),
        currentDate.endOf("day").toDate(),
      ])
      .orderBy("created_at", "desc")
      .first();

    if (!promotion) return null;

    const promotionProducts = await Models.PromotionProduct.query()
      .where("promotionId", promotion.id)
      .withGraphFetched("product");

    return {
      promotion,
      products: promotionProducts.map((pp) => pp.product),
    };
  }

  // Lấy tất cả các khuyến mãi đang hoạt động và trong khoảng thời gian hiện tại
  async getPromotionByCustomer() {
    const currentDate = moment();
    const promotions = await this.model
      .query()
      .where("isActive", true)
      .whereBetween("startDate", [
        currentDate.startOf("day").toDate(),
        currentDate.endOf("day").toDate(),
      ])
      .orderBy("created_at", "desc");

    if (promotions.length === 0) return null;

    return promotions;
  }
}

module.exports = PromotionService;
