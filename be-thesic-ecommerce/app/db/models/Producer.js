'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');
class Producer extends CustomModel {
  static get tableName() {
    return 'producer';
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
      categories: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Category'),
        join: {
          from: 'producer.categoryId',
          to: 'category.id'
        }
      }
    };
  }
}
module.exports = Producer;