'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createBanner = {
  name: Joi.string().required(),
  imageUrl: Joi.string().required(),
  targetUrl: Joi.string().required(),
  isActive: Joi.boolean()
};

exports.updateBanner = {
  name: Joi.string(),
  imageUrl: Joi.string(),
  targetUrl: Joi.number(),
  isActive: Joi.boolean()
};
