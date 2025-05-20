"use strict";

const Joi = require("@hapi/joi");
const { queryParams, checkToken } = require("../../utils/validatorUtils");

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.idParam = Joi.number().required().description("id is required");

exports.validateCount = {
  startTime: Joi.date().iso(),
  endTime: Joi.date().iso().greater(Joi.ref("startTime")),
};

exports.validateYear = {
  startDate: Joi.string(),
  endDate: Joi.string(),
};

exports.validateProductStatistic = {
  time: Joi.string(),
  type: Joi.string(),
  limit: Joi.number()
}