'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/transaction',
    config: handler.getMany
  },
  {
    method: 'POST',
    path: '/api/v1/payment/vn-pay-add',
    config: handler.createVNPayPayment
  },
  {
    method: 'POST',
    path: '/api/v1/payment/vn-pay-check',
    config: handler.checkVNPayPayment
  },
  {
    method: 'GET',
    path: '/api/v1/transactions/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
