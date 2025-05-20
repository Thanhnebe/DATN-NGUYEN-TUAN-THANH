'use strict';

const Joi = require('@hapi/joi');
const {
  queryParams,
  checkToken,
  searchParams
} = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.searchParams = searchParams;

exports.checkToken = checkToken;

exports.idParam = Joi.string()
  .required()
  .description('Mã nhà cung cấp là bắt buộc');

exports.createProducer = {
  name: Joi.string().required().error(new Error('Tên nhà cung cấp không được bỏ trống')),
  address: Joi.string().allow(null),
  description: Joi.string().allow(null),
  categoryId: Joi.number().allow(null),
  image: Joi.string().allow(null),
  isActive: Joi.boolean()
};

exports.updateProducer = {
  name: Joi.string().allow(null),
  address: Joi.string().allow(null),
  description: Joi.string().allow(null),
  categoryId: Joi.number().allow(null),
  image: Joi.string().allow(null),
  isActive: Joi.boolean()
};

exports.activate = Joi.boolean().required();
