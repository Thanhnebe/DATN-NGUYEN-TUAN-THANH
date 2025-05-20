'use strict';

const CustomModel = require('./CustomModel');

class InventoryLogs extends CustomModel {
  static get tableName() {
    return 'InventoryLogs';
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
  }

  $beforeUpdate() {
    this.createdAt = new Date().toISOString();
  }
}

module.exports = InventoryLogs;