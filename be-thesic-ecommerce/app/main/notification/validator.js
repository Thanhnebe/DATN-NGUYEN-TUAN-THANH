"use strict";

const Joi = require("@hapi/joi");
const {
  queryParams,
  checkToken,
  searchParams,
} = require("../../utils/validatorUtils");

exports.queryParams = queryParams;

exports.checkToken = checkToken;

const queryUser = {
  userId: Joi.string(),
};

exports.searchParams = searchParams;
exports.queryUser = queryUser;

exports.idParam = Joi.number().required().description("id is required");

exports.updateView = {
  userId: Joi.string().required(),
  notificationIds: Joi.array().required(),
};
