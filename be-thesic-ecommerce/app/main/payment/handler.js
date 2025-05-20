"use strict";

const VNPayController = require("./vn-pay.controller");
const validator = require("./validator");
const Joi = require("@hapi/joi");

const controller = new VNPayController();

exports.getMany = {
  description: 'Get Transaction list',
  notes: 'Return Transaction items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin', 'staff']
  },
  validate: {
    headers: validator.checkToken,
    query: validator.searchParams
  }
};

exports.createVNPayPayment = {
  description: "Get Product list",
  notes: "Return Product items",
  tags: ["api", "v1"],
  handler: controller.createVNPayment.bind(controller),
  auth: false,
  validate: {
    headers: validator.checkToken,
    payload: validator.createVNPayPayment,
  },
};

exports.checkVNPayPayment = {
  description: "Get a Product",
  notes: "Return a Product by id",
  tags: ["api", "v1"],
  handler: controller.checkVNPayPayment.bind(controller),
  auth: "jwt",
  auth: false,
  validate: {
    payload: Joi.object().unknown(true),
  },
};

exports.exportExcel = {
  description: 'Export excel',
  notes: 'Return export excel',
  tags: ['api', 'v1'],
  handler: controller.exportExcel.bind(controller),
  auth: false,
  validate: {
    query: validator.queryParams
  }
};