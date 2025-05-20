"use strict";

const service = require("./service");

exports.countDashboard = async (request) => {
  try {
    return await service.countDashboard(request.query);
  } catch (err) {
    throw err;
  }
};

exports.countRevenue = async (request) => {
  try {
    return await service.monthlyRevenueByYear(request.query);
  } catch (err) {
    throw err;
  }
};

exports.statisticProducts = async (request) => {
  try {
    const query = request.query
    return await service.statisticProduct(query.time, query.type, query.limit);
  } catch (err) {
    throw err;
  }
};
