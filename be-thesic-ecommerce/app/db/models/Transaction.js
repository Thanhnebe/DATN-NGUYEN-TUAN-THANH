'use strict';
const path = require('path');
const CustomModel = require('./CustomModel');

class Transaction extends CustomModel {
  static get tableName() {
    return 'transaction';
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      order: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/Order'),
        join: {
          from: 'transaction.orderId',
          to: 'order.id'
        }
      }
    };
  }
}

module.exports = Transaction;