"use strict";
const VNPayService = require("./vn-pay.service.js");
class VNPayController {
  async getMany(request) {
    try {
      const vnpayService = new VNPayService();
      return vnpayService.getMany(request.query);
    } catch (err) {
      throw err;
    }
  };

  async createVNPayment(request) {
    try {
      const vnpayService = new VNPayService();
      return vnpayService.addVNPayTransaction(request);
    } catch (err) {
      throw err;
    }
  }

  async checkVNPayPayment(request) {
    try {
      const { payload } = request;
      console.log('==================payload=====================: ', payload);
      const vnpayService = new VNPayService();
      return vnpayService.checkVNPayPayment(payload);
    } catch (err) {
      throw err;
    }
  }

  async exportExcel(request, h) {
    try {
      const vnpayService = new VNPayService();
      return vnpayService.exportExcel(request.query, h);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = VNPayController;
