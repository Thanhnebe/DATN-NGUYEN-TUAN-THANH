"use strict";

const BaseControllerCRUD = require("../../base/BaseControllerCRUD");
const OrderService = require("./service");

class OrderController extends BaseControllerCRUD {
  constructor() {
    super(new OrderService());
  }

  async createOne(request) {
    try {
      console.log("==============join create order================");
      const { payload } = request;
      return await this.service.createOne(payload, request);
    } catch (err) {
      throw err;
    }
  }

  async checkout(request) {
    try {
      const { payload } = request;
      return await this.service.checkout(payload);
    } catch (err) {
      console.log("=====================loi checkout:", err);
      throw err;
    }
  }

  async getMany(request) {
    try {
      return await this.service.getMany(request.query);
    } catch (err) {
      throw err;
    }
  }

  async getOne(request) {
    try {
      const { id } = request.params;
      return await this.service.getOne(id);
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(request) {
    try {
      const { id } = request.params;
      return await this.service.deleteOne(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderController;
