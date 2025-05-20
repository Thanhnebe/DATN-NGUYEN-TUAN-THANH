'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');

class ProductInventory extends CustomModel {
  static get tableName() {
    return 'ProductInventory';
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

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }


}

module.exports = ProductInventory;