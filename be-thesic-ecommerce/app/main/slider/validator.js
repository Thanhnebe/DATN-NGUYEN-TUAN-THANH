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

exports.createSlider = {
  name: Joi.string().required(),
  isActive: Joi.boolean().default(false),
  items: Joi.array()
    .items(
      Joi.object({
        imageUrl: Joi.string().required(),
        targetUrl: Joi.string().required(),
      })
    )
    .required(),
};

exports.updateSlider = {
  name: Joi.string().required(),
  isActive: Joi.boolean(),
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string(),
        imageUrl: Joi.string().required(),
        targetUrl: Joi.string().required(),
      })
    )
    .required(),
};
