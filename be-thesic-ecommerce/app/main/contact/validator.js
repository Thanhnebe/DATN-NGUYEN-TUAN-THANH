'use strict';

const Joi = require('@hapi/joi');
const {
  idNumber,
  queryParams,
  objectGeoLocation,
  checkToken,
  searchParams, strEmail
} = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.searchParams = searchParams;

exports.checkToken = checkToken;

exports.idParam = Joi.string()
  .required()
  .description('Mã liên hệ là bắt buộc');

exports.createContact = {
  name: Joi.string().required().error(new Error('Tên liên hệ không được để trống')),
  email: strEmail().required().error(new Error('Email không được để trống')),
  subject: Joi.string().allow(null),
  message: Joi.string().allow(null)
};

exports.updateContact = {
  name: Joi.string().allow(null),
  email: strEmail().allow(null),
  subject: Joi.string().allow(null),
  message: Joi.string().allow(null),
};

exports.activate = Joi.boolean().required();
