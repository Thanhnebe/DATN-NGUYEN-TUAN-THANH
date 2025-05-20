'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.countDashboard = {
  description: 'Get Dashboard admin list',
  notes: 'Return Dashboard admin items',
  tags: ['api', 'v1'],
  handler: controller.countDashboard,
  auth: {
    strategy: 'jwt',
  },
  validate: {
    headers: validator.checkToken,
    query: validator.validateCount
  }
};

exports.getRevenues = {
  description: 'lấy doanh thu theo năm',
  notes: 'lấy doanh thu theo năm',
  tags: ['api', 'v1'],
  handler: controller.countRevenue,
  auth: {
    strategy: 'jwt',
  },
  validate: {
    headers: validator.checkToken,
    query: validator.validateYear
  }
};

exports.statisticProducts = {
  description: 'lấy doanh thu theo năm',
  notes: 'lấy doanh thu theo năm',
  tags: ['api', 'v1'],
  handler: controller.statisticProducts,
  auth: {
    strategy: 'jwt',
  },
  validate: {
    headers: validator.checkToken,
    query: validator.validateProductStatistic
  }
};