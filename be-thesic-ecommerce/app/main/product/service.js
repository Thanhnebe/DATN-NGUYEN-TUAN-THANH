"use strict";

const Boom = require("@hapi/boom");
const Models = require("../../db/models");
const BaseServiceCRUD = require("../../base/BaseServiceCRUD");
const fs = require("fs");
const RedisService = require("../../services/redis");

class ProductService extends BaseServiceCRUD {
  constructor() {
    super(Models.Product, "Product");
  }

  async createProduct(payload) {
    const { ...product } = payload;
    const percentDiscount = Math.floor(
      ((payload.originalPrice - payload.price) / payload.originalPrice) * 100
    );
    const newProduct = await this.model
      .query()
      .insert({ ...product, percentDiscount })
      .returning("*");

    return newProduct;
  }

  async getChildCategoryIds(parentId) {
    const childCategories = await Models.Category.query()
      .where("parent", parentId)
      .select("id");

    if (!childCategories.length) {
      return [];
    }

    const categoryIds = childCategories.map((category) => category.id);

    const grandChildIdsArray = await Promise.all(
      childCategories.map(async (category) => {
        return this.getChildCategoryIds(category.id);
      })
    );

    const grandChildIds = grandChildIdsArray.flat();

    return categoryIds.concat(grandChildIds);
  }

  async getByClient(query) {
    let {
      minPrice,
      maxPrice,
      page = 1,
      pageSize = 10,
      isHot,
      isBestSelling,
      categoryId,
      productId,
      isFeature,
      searchName,
    } = query;

    let cacheKey = null;
    if (isHot) cacheKey = "products-isHot";
    else if (isBestSelling) cacheKey = "products-isBestSelling";
    else if (isFeature) cacheKey = "products-isFeature";
    if (cacheKey) {
      const cachedData = await RedisService.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    }

    let newQuery = {isActive: true};
    if (isHot) {
      newQuery.isHot = true;
      newQuery.isBestSelling = false;
    }

    // Filter by isBestSelling
    if (isBestSelling) {
      newQuery.isBestSelling = true;
      newQuery.isHot = false;
    }

    if (isFeature) {
      newQuery.isHot = false;
      newQuery.isBestSelling = false;
    }

    delete query?.isHot;
    delete query?.isBestSelling;
    delete query?.categoryId;
    delete query?.productId;
    delete query?.isFeature;

    query.filter = newQuery;

    let categoryIds = [];
    if (categoryId != undefined) {
      // Check if the category has any child categories
      const childCategories = await this.getChildCategoryIds(categoryId);
      if (childCategories.length) {
        categoryIds = [categoryId, ...childCategories];
      } else {
        categoryIds.push(categoryId);
      }
    }

    const builder = this.model
      .queryBuilder(query)
      .withGraphFetched("[categories, rating]")
      .where("isActive", true);

    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    if (categoryIds.length) {
      builder.whereIn("categoryId", categoryIds);
    }

    // Pagination logic
    const offset = (page - 1) * pageSize;
    builder.limit(pageSize).offset(offset);

    if (minPrice && !maxPrice) {
      builder.where("price", ">=", minPrice);
    }

    if (maxPrice && !minPrice) {
      builder.where("price", "<=", maxPrice);
    }

    if (minPrice && maxPrice) {
      builder.whereBetween("price", [minPrice, maxPrice]);
    }

    if (categoryId && productId) {
      const parentCategory = await Models.Category.query()
        .select("parent")
        .where("id", categoryId)
        .first();
      
      newQuery.categoryId = categoryId;
    
      builder.whereNot("id", productId);
      
      if (parentCategory && parentCategory.parent) {
        builder.orWhere("categoryId", categoryId)
               .orWhereIn("categoryId", function () {
                 this.select("id")
                     .from("category") 
                     .where("parent", parentCategory.parent);
               });
      } else {
        builder.where("categoryId", categoryId);
      }
      builder.orderByRaw(`CASE 
        WHEN "categoryId" = ? THEN 1 
        ELSE 2 
      END`, [categoryId]);
    }
    

    if (searchName) {
      builder.where("nameProduct", "ilike", `%${searchName}%`);
    }

    const result = await builder;
    // Optionally, get the total count for the pagination metadata
    const totalItems = await builder.resultSize();

    const totalPages = Math.ceil(totalItems / pageSize);
    const response = {
      pagination: {
        page,
        pageSize,
        totalItems: totalItems,
        totalPages,
      },
      products: result,
    };

    if (cacheKey)
      await RedisService.set(cacheKey, JSON.stringify(response), 86400);
    return response;
  }

  async getMany(query) {
    const builder = this.model
      .queryBuilder(query)
      .withGraphFetched("[categories, rating]");
    // .where("isActive", true);

    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }

    return builder;
  }

  async getProductByProducer(query, id) {
    const builder = this.model
      .queryBuilder(query)
      .where("producerId", id)
      .withGraphFetched("[categories, rating]")
      .where("isActive", true);
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getProductPointRating(query, categoryId, point) {
    let min, max;
    if (point === 5) {
      min = 4.5;
      max = 5;
    }
    if (point === 4) {
      min = 3.5;
      max = 4.49;
    }
    if (point === 3) {
      min = 2.5;
      max = 3.49;
    }
    if (point === 2) {
      min = 1.5;
      max = 2.49;
    }
    const promotions = await Models.Promotion.findById(1);
    console.log("promotions: ", promotions);
    const builder = await Models.Rating.query()
      .select("rating.productId")
      .withGraphFetched("products")
      .avg("rating.point as avgPoint")
      .groupBy("rating.productId");

    return builder;
  }

  async getOne(id) {
    // const cacheKey=`product-id-${id}`
    // const cachedData = await RedisService.get(cacheKey);
    // if (cachedData) return JSON.parse(cachedData);
    const result = await this.model
      .query()
      .findById(id)
      .withGraphFetched("[categories, rating, producers]");
    // .where("isActive", true);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    const newResult = { ...result };
    newResult.gallery = [result.image, ...result.gallery];

    // if (cacheKey)
    //   await RedisService.set(cacheKey, JSON.stringify(newResult), 86400);
    return newResult;
  }

  async createOne(payload) {
    const originalPrice = payload.originalPrice;
    const price = payload.price;

    const percentDiscount = Math.floor(
      ((originalPrice - price) / originalPrice) * 100
    );
    return this.model
      .query()
      .insert({ ...payload, percentDiscount })
      .returning("*")
      .withGraphFetched("categories");
  }

  async updateOne(id, payload) {
    let newPayload = { ...payload };
    if (payload?.originalPrice && payload?.price) {
      const originalPrice = payload.originalPrice;
      const price = payload.price;

      const percentDiscount = Math.floor(
        ((originalPrice - price) / originalPrice) * 100
      );
      newPayload = { ...newPayload, percentDiscount };
    }

    const result = await this.model
      .query()
      .patchAndFetchById(id, newPayload)
      .withGraphFetched("[categories, rating]");
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async updateNumberAvailable(id, payload) {
    const builder = await this.model.query().findById(id);
    if (!builder) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    const newNumberAvailable =
      builder.numberAvailable - payload.numberAvailable;
    const result = await Models.Product.query()
      .update({
        numberAvailable: newNumberAvailable,
      })
      .where("id", id)
      .returning("*");
    return result;
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw("LOWER(\"nameProduct\") LIKE '%' || LOWER(?) || '%' ", q);
    });
  }

  async seedProduct() {
    const products = await this.model
      .queryBuilder({})
      .withGraphFetched("[categories, producers]");

    const newProducts = await Promise.all(
      products.map((product) => {
        const {
          nameProduct,
          image,
          price,
          numberAvailable,
          description,
          properties,
          gallery,
          isActive,
          createdAt,
          updatedAt,
        } = product;
        const categoryId = product?.categories?.nameCategory || null;
        const producerId = product?.producers?.name || null;
        const isHot = Math.random() >= 0.5;
        const isBestSelling = Math.random() >= 0.5;

        const percentDiscount = Math.floor(Math.random() * 90) + 1;
        const originalPrice =
          price + Math.floor((percentDiscount / 100) * price);
        const cost = Math.floor(0.7 * price);
        return {
          nameProduct,
          image,
          price,
          cost,
          percentDiscount,
          originalPrice,
          numberAvailable,
          description,
          properties,
          gallery,
          isHot,
          isBestSelling,
          isActive: true,
          createdAt,
          updatedAt,
          categoryId,
          producerId,
        };
      })
    );

    const categories = await Models.Category.queryBuilder({});
    const newCategory = await Promise.all(
      categories.map(async (category) => {
        let parent = null;
        if (category.parent) {
          const newParent = await Models.Category.query().findById(
            category.parent
          );
          parent = newParent.nameCategory;
        }
        delete category.id;
        return { ...category, parent };
      })
    );

    const producers = await Models.Producer.queryBuilder({}).withGraphFetched(
      "[categories]"
    );
    const newProducers = await Promise.all(
      producers.map((producer) => {
        const { name, image, isActive } = producer;
        let categoryId = producer?.categories?.nameCategory;
        if (!categoryId) {
          categoryId = "Dưỡng da";
        }
        return {
          name,
          image,
          isActive,
          categoryId,
        };
      })
    );

    fs.writeFile(
      "category-seed.json",
      JSON.stringify(newCategory, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing to JSON file:", err);
        } else {
          console.log("JSON file has been saved.");
        }
      }
    );

    return newCategory;
  }

  async topSellingProduct() {
    console.log("===========calculate top selling product===========")
    const trx = await Models.knex.transaction();

    try {
      const products = await Models.OrderDetail.query()
        .select("orderDetail.productId")
        .count("orderDetail.quantity as totalSold")
        .join("order", "orderDetail.orderId", "order.id")
        .join("product", "orderDetail.productId", "product.id")
        .groupBy(
          "orderDetail.productId",
          "product.nameProduct",
          "product.image"
        )
        .orderBy("totalSold", "desc")
        .limit(20)
        .select("product.nameProduct", "product.image");

      const productIds = products.map((product) => product.productId);
      await Promise.all([
        Models.Product.query(trx)
          .whereIn("id", productIds)
          .patch({ isBestSelling: true }),
        Models.Product.query(trx)
          .whereNotIn("id", productIds)
          .patch({ isBestSelling: false }),
        RedisService.set("products-isBestSelling", null, 86400),
      ]);

      await trx.commit();
    } catch (error) {
      console.log(error);
      await trx.rollback();
    }
  }
}

module.exports = ProductService;
