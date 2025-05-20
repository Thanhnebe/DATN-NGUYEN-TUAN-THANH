'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');

class PromotionProduct extends CustomModel {
  static get tableName() {
    return 'promotionProducts';
  }

  static get relationMappings() {
    return {
      product: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Product'),
        join: {
          from: 'promotionProducts.productId',
          to: 'product.id'
        }
      },
    
    };
  }

}

module.exports = PromotionProduct;