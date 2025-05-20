'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/notifications',
    config: handler.getByUserId
  },
  {
    method: 'GET',
    path: '/api/v1/notifications/count',
    config: handler.countNoti
  },
  {
    method: 'PUT',
    path: '/api/v1/notifications',
    config: handler.updateView
  }
];

module.exports = Routes;
