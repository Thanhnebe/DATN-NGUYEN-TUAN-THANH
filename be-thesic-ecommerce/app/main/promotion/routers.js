'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/promotions',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/promotions/banner',
    config: handler.getBanner
  },
  {
    method: 'GET',
    path: '/api/v1/promotions/customer',
    config: handler.getPromotionsByCustomer
  },
  {
    method: 'GET',
    path: '/api/v1/promotions/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/promotions/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/promotions',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/promotions/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/promotions/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/promotions/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
