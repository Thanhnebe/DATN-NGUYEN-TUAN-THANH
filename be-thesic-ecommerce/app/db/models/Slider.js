'use strict';

const CustomModel = require('./CustomModel');

class Slider extends CustomModel {
  static get tableName() {
    return 'slider';
  }
}

module.exports = Slider;