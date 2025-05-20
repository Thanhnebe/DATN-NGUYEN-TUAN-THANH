'use strict';

const Joi = require('@hapi/joi');
const { queryParams, searchParams, checkToken } = require('../../utils/validatorUtils');
const {  DISCOUNT_TYPE, PROMOTION_DISCOUNT_TYPE, PROMOTION_TYPE } = require('./../../config/type')

exports.queryParams = queryParams;

exports.searchParams = searchParams;

exports.checkToken = checkToken;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createPromotion = {
  promotionName: Joi.string(),
  productIds: Joi.array().allow(null),
  type: Joi.string().valid(PROMOTION_TYPE).required(),
  discountValue: Joi.number().min(0).allow(null),
  discountType: Joi.string().valid(PROMOTION_DISCOUNT_TYPE).required(),
  minQuantity: Joi.number().min(0).allow(null),
  giftProduct: Joi.array().allow(null),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')),
  isActive: Joi.boolean(),
  image: Joi.string().allow(null),
  description: Joi.string().allow(null)
};

exports.updatePromotion = {
    promotionName: Joi.string(),
    productIds: Joi.array().allow(null),
    type: Joi.string().valid(PROMOTION_TYPE),
    discountValue: Joi.number().min(0).allow(null),
    discountType: Joi.string().valid(PROMOTION_DISCOUNT_TYPE),
    minQuantity: Joi.number().min(0).allow(null),
    giftProduct: Joi.array().allow(null),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')),
    isActive: Joi.boolean(),
    image: Joi.string().allow(null),
    description: Joi.string().allow(null)
};
