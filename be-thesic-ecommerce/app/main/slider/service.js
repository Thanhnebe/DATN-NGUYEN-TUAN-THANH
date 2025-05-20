"use strict";

const Boom = require("@hapi/boom");
const Models = require("../../db/models");
const BaseServiceCRUD = require("../../base/BaseServiceCRUD");

class SliderService extends BaseServiceCRUD {
  constructor() {
    super(Models.Slider, "Slider");
  }

  async createOne(payload) {
    const { name } = payload;
    const slider = await this.model.query().insert({ name }).returning("*");
    
    return {};
  }
}

module.exports = SliderService;
