'use strict';

const CustomModel = require('./CustomModel');
const RedisService = require("../../services/redis");

class Category extends CustomModel {
  static get tableName() {
    return 'category';
  }
  async $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    await RedisService.delete('category_tree')
  }

  async $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
   await RedisService.delete('category_tree')
  }

  async $beforeDelete() {
   await RedisService.delete('category_tree')
  }
}

module.exports = Category;