'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/sliders',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/sliders/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/sliders/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/sliders',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/sliders/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/sliders/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
