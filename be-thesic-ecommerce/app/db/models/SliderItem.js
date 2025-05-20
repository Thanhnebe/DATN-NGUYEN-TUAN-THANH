'use strict';

const CustomModel = require('./CustomModel');

class SliderItem extends CustomModel {
  static get tableName() {
    return 'slider_item';
  }
}

module.exports = SliderItem;