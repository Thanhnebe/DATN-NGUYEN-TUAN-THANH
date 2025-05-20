'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, searchParams } = require('../../utils/validatorUtils');
const { ORDER_STATUS } = require('../../config/type');
const PAYMENT_METHODS = ['COD', 'VNPAY'];
exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.searchParams = searchParams;

exports.idParam = Joi.number()
  .required()
  .description('Mã đơn hàng là bắt buộc');

exports.createOrder = {
  fullName: Joi.string().allow(null).required().error(new Error('Họ tên không được để trống')),
  address: Joi.object().allow(null).required().error(new Error('Địa chỉ không được để trống')),
  note: Joi.string().allow(null),
  status: Joi.string().valid(ORDER_STATUS).allow(null),
  isPaid: Joi.boolean().allow(null),
  phone: Joi.string().allow(null).required().error(new Error('Số điện thoại không được để trống')),
  userId: Joi.number().allow(null).required().error(new Error('Khách hàng không được để trống')),
  products: Joi.array().items(
    Joi.object({
      quantity: Joi.number().min(1).required(),
      productId: Joi.number().required()
    })
  ).required().error(new Error('Sản phẩm không được để trống')),
  paymentMethod: Joi.string().valid(...PAYMENT_METHODS).required().error(new Error('Vui lòng chọn phương thức thanh toán'))
};

exports.checkout = {
  // address: Joi.object().allow(null).required(),
  userId: Joi.number().allow(null),
  products: Joi.array().items(
    Joi.object({
      quantity: Joi.number().min(1).required(),
      productId: Joi.number().required()
    })
  ).required().error(new Error('Sản phẩm không được để trống'))
};

exports.updateOrder = {
  fullName: Joi.string().allow(null),
  address: Joi.object().allow(null),
  note: Joi.string().allow(null),
  status: Joi.string().valid(ORDER_STATUS),
  isPaid: Joi.boolean(),
  phone: Joi.string().allow(null),
  userId: Joi.number().allow(null),
  paymentMethod: Joi.string().valid(...PAYMENT_METHODS).allow(null)
};
