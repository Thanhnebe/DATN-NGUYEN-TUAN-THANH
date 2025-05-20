'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/provinces',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/provinces/{code}/states',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/provinces/{code}/wards',
    config: handler.getWard
  }
];

module.exports = Routes;
