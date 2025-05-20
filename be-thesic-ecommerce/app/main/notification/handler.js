"use strict";

const BlogsController = require("./controller");
const validator = require("./validator");

const controller = new BlogsController();

exports.getMany = {
  description: 'Get Order list',
  notes: 'Return Order items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: 'jwt',
  validate: {
    query: validator.searchParams
  }
};

exports.getByUserId = {
  description: "Get notification list",
  notes: "Return notification",
  tags: ["api", "v1"],
  handler: controller.getByUserId.bind(controller),
  auth: "jwt",
  validate: {
    headers: validator.checkToken,
    query: validator.queryUser,
  },
};

exports.countNoti = {
  description: "Get notification list",
  notes: "Return notification",
  tags: ["api", "v1"],
  handler: controller.countNoti.bind(controller),
  auth: "jwt",
  validate: {
    headers: validator.checkToken,
    query: validator.queryUser,
  },
};

exports.updateView = {
  description: "Check a order",
  notes: "Return calculated order",
  tags: ["api", "v1"],
  handler: controller.updateView.bind(controller),
  auth: "jwt",
  validate: {
    headers: validator.checkToken,
    payload: validator.updateView,
  },
};
