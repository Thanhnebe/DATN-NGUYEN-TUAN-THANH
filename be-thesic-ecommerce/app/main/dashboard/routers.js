'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/dashboards',
    config: handler.countDashboard
  },
  {
    method: 'GET',
    path: '/api/v1/dashboards/revenues',
    config: handler.getRevenues
  },
  {
    method: 'GET',
    path: '/api/v1/dashboards/products',
    config: handler.statisticProducts
  }
];

module.exports = Routes;
