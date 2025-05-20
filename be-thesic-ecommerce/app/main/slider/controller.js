'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const SliderService = require('./service');

class SliderController extends BaseControllerCRUD {
  constructor() {
    super(new SliderService());
  }
}

module.exports = SliderController;
