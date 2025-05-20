'use strict';

const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class ContactService extends BaseServiceCRUD {
  constructor() {
    super(Models.Banner, 'banner');
  }
}

module.exports = ContactService;
