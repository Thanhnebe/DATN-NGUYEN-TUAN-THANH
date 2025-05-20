'use strict';

const CustomModel = require('./CustomModel');

class Promotion extends CustomModel {
  static get tableName() {
    return 'Promotions';
  }
}

module.exports = Promotion;