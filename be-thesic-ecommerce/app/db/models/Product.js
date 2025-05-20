'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');
const RedisService = require("../../services/redis");

class Product extends CustomModel {
  static get tableName() {
    return 'product';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        properties: { type: 'object' },
        gallery: { type: 'array' }
      }
    };
  }

  async $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    await Promise.all([
      RedisService.delete('products-isHot'),
      RedisService.delete('products-isBestSelling'),
      RedisService.delete('products-isFeature')
    ])
  }

  async $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
    await Promise.all([
      RedisService.delete('products-isHot'),
      RedisService.delete('products-isBestSelling'),
      RedisService.delete('products-isFeature')
    ])
  }

  async $beforeDelete() {
    await Promise.all([
      RedisService.delete('products-isHot'),
      RedisService.delete('products-isBestSelling'),
      RedisService.delete('products-isFeature')
    ])
  }

  static get relationMappings() {
    return {
      categories: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Category'),
        join: {
          from: 'product.categoryId',
          to: 'category.id'
        }
      },
      producers: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Producer'),
        join: {
          from: 'product.producerId',
          to: 'producer.id'
        }
      }
      ,
      rating: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/Rating'),
        join: {
          from: 'product.id',
          to: 'rating.productId'
        }
      }
    };
  }
}

module.exports = Product;