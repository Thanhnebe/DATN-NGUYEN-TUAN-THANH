"use strict";

const Boom = require("@hapi/boom");
const Models = require("../../db/models");
const BaseServiceCRUD = require("../../base/BaseServiceCRUD");
const RedisService = require("../../services/redis");
const cacheKey = "category_tree";
class CategoryService extends BaseServiceCRUD {
  constructor() {
    super(Models.Category, "Category");
  }
  async fetchAllDescendantCategoryIds(parentId) {
    const allCategoryIds = new Set();
    const queue = [parentId];

    while (queue.length > 0) {
      const currentParentId = queue.shift();
      const categories = await Models.Category.query().where(
        "parent",
        currentParentId
      );

      for (const category of categories) {
        if (!allCategoryIds.has(category.id)) {
          allCategoryIds.add(category.id);
          queue.push(category.id);
        }
      }
    }

    return Array.from(allCategoryIds);
  }

  async getManyProductOfCategory(query, id) {
    const { minPrice, maxPrice } = query;
    const allDescendantCategoryIds = await this.fetchAllDescendantCategoryIds(
      id
    );

    const builder = Models.Product.queryBuilder(query)
      .withGraphFetched("[categories, rating]")
      .where("isActive", true)
      .whereIn("categoryId", [id, ...allDescendantCategoryIds]);

    if (minPrice && maxPrice) {
      builder.whereBetween("price", [minPrice, maxPrice]);
    }

    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async updateOne(id, payload) {
    const result = await this.model.query().patchAndFetchById(id, payload);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }

    if (payload?.parent) {
      await Models.Category.query()
        .where("id", payload.parent)
        .where("parent", id)
        .patch({ parent: null });
    }
    await RedisService.set(cacheKey, null, 86400);
    return result;
  }

  async getCategoryParent(currentCategoryId) {
    const categories = await Models.Category.query().whereNot(
      "id",
      currentCategoryId
    );
    return categories || [];
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw("LOWER(\"nameCategory\") LIKE '%' || LOWER(?) || '%' ", q);
    });
  }

  async createOne(payload) {
    await RedisService.set(cacheKey, null, 86400);
    return Models.Category.query().insert(payload).returning("*");
  }

  async getTree() {
    try {
      const cachedData = await RedisService.get(cacheKey);
      if (cachedData) {
        return { results: JSON.parse(cachedData) };
      }

      // const data = (await this.getMany({ columns: ["id", "nameCategory", "parent"] })) || [];
      // const data = (await this.getMany({
      //   columns: ["id", "nameCategory", "parent"],
      //   orderBy: [{ column: "createdAt", order: "desc" }]
      // })) || [];
      const data =
        (await Models.Category.query()
          .select("id", "nameCategory", "parent", "image")
          .orderBy("createdAt", "desc")) || [];

      const dataTree = await this.buildDataToTree(data);

      await RedisService.set(cacheKey, JSON.stringify(dataTree), 86400);

      return { results: dataTree };
    } catch (error) {
      return { results: [] };
    }
  }

  async buildDataToTree(arr, parent = null) {
    const arrayToTree = (arr, parent = null) =>
      arr
        .filter((item) => {
          if (
            item.parent == parent ||
            (item.parent && parent && item.parent == parent)
          ) {
            return {
              ...item,
            };
          }
        })
        .map((child) => ({
          ...child,
          children: arrayToTree(arr, child.id),
        }));
    return arrayToTree(arr, parent);
  }

  async deleteOne(id) {
    const [hasChildren, hasProduct] = await Promise.all([
      Models.Category.query().where("parent", id).resultSize(),
      Models.Product.query().where("categoryId", id).resultSize(),
    ]);

    if (hasChildren > 0) {
      return { success: false, message: "Bạn không thể xóa danh mục cha" };
    } else if (hasProduct > 0) {
      return {
        success: false,
        message: "Không thể xóa danh mục đã có sản phẩm",
      };
    }
    await Promise.all([
      RedisService.set(cacheKey, null, 86400),
      Models.Category.query().deleteById(id),
    ]);

    return { success: true };
  }
}

module.exports = CategoryService;
