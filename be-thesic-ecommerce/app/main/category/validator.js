'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, searchParams } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.searchParams = {
  ...searchParams,
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number()
};

exports.idParam = Joi.number()
  .required()
  .description('Mã danh mục là bắt buộc');

exports.createCategory = {
  nameCategory: Joi.string().required().error(new Error('Tên danh mục không được để trống')),
  description: Joi.string().allow(null),
  image: Joi.string().allow(null),
  isActive: Joi.boolean(),
  parent: Joi.number().allow(null)
};

exports.updateCategory = {
  nameCategory: Joi.string().required().allow(null),
  description: Joi.string().allow(null),
  image: Joi.string().allow(null),
  isActive: Joi.boolean(),
  parent: Joi.number().allow(null)
};
