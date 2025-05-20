"use strict";

const Joi = require("@hapi/joi");
const {
  queryParams,
  checkToken,
  searchParams,
} = require("../../utils/validatorUtils");

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.searchParams = searchParams;

exports.idParam = Joi.number().required().description("id is required");

exports.createVNPayPayment = {
    amount: Joi.number().required().error(new Error('Số lượng là bắt buộc')),
    // bankCode: Joi.string().required(),
    orderDescription: Joi.string().required().error(new Error('Mô tả đơn hàng là bắt buộc')),
    orderId: Joi.string().required().error(new Error('Mã đơn hàng là bắt buộc')),
    orderType: Joi.string().required(),
    language: Joi.string().required(),
};