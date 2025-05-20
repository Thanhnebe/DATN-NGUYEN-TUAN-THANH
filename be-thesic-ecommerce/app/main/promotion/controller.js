'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const PromotionService = require('./service')

class PromotionController extends BaseControllerCRUD {
  constructor() {
    super(new PromotionService());
  }

  async getBanner() {
    try {
      return this.service.getBanner()
    } catch (err) {
      throw err;
    }
  };

  async getPromotionsByCustomer() {
    try {
      return this.service.getPromotionByCustomer()
    } catch (err) {
      throw err;
    }
  };
}

module.exports = PromotionController;
