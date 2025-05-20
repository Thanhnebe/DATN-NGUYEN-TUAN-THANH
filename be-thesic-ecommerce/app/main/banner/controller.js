'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const BannerService = require('./service');

class BannerController extends BaseControllerCRUD {
  constructor() {
    super(new BannerService());
  }
}

module.exports = BannerController;
