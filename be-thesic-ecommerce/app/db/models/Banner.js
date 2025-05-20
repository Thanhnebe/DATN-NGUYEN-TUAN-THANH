'use strict';

const CustomModel = require('./CustomModel');

class Banner extends CustomModel {
  static get tableName() {
    return 'banner';
  }
}

module.exports = Banner;