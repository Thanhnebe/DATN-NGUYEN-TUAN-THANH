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

exports.searchClientParams = {
  page: Joi.number().min(1).default(1),
  pageSize: Joi.number().default(10),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number(),
  isHot: Joi.boolean(),
  isBestSelling: Joi.boolean(),
  isFeature: Joi.boolean(),
  categoryId: Joi.string(),
  productId: Joi.string(),
  orderBy: Joi.string(),
  filter: Joi.object(),
  searchName: Joi.string(),
};

exports.idParam = Joi.number().required().description("id is required");

exports.createProduct = {
  nameProduct: Joi.string().required().error(new Error('Tên sản phẩm không được để trống')),
  price: Joi.number().min(0).required().error(new Error('Giá sản phẩm không được để trống')),
  description: Joi.string().allow(null),
  numberAvailable: Joi.number().min(0).allow(null),
  categoryId: Joi.number().required().error(new Error('Danh mục không được để trống')),
  isActive: Joi.boolean(),
  isHot: Joi.boolean(),
  image: Joi.string().allow(null).error(new Error('Hình ảnh không hợp lệ')),
  properties: Joi.object().allow(null),
  gallery: Joi.array().items(Joi.string()).allow(null),
  producerId: Joi.number().allow(null),
  // stockQuantity: Joi.number().min(0).allow(0),
  expDate: Joi.string().allow(null),
  productionDate: Joi.string().allow(null),
  originalPrice: Joi.number().required().error(new Error("Giá gốc không được để trống")),
  cost: Joi.number().required().error(new Error("Chi phí không được để trống"))
};

exports.updateProduct = {
  nameProduct: Joi.string().allow(null),
  price: Joi.number().min(0).allow(null),
  description: Joi.string().allow(null),
  numberAvailable: Joi.number().min(0).allow(null),
  categoryId: Joi.number(),
  isActive: Joi.boolean(),
  isHot: Joi.boolean(),
  image: Joi.string().allow(null),
  properties: Joi.object().allow(null),
  gallery: Joi.array().items(Joi.string()).allow(null),
  producerId: Joi.number().allow(null),
  // stockQuantity: Joi.number().min(0).allow(0),
  expDate: Joi.string().allow(null),
  productionDate: Joi.string().allow(null),
  originalPrice: Joi.number(),
  cost: Joi.number()
};

exports.updateNumberAvailable = {
  numberAvailable: Joi.number().allow(null),
};
