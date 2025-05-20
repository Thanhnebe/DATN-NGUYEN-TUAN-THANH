'use strict';

const Boom = require('@hapi/boom');
const pcVN = require('pc-vn')

exports.getMany = async (query) => {
  const provinces = await pcVN.getProvinces();
  return provinces;
}

exports.getOne = async (query, code) => {
  const states = pcVN.getDistrictsByProvinceCode(code);
  if (!states) {
    throw Boom.badRequest('Không tìm thấy quận/huyện')
  }
  return states;
}

exports.getWardByProvince = async (query, code) => {
  const wards = pcVN.getWardsByDistrictCode(code)
  if (!wards) {
    throw Boom.badRequest('Không tìm thấy phường/xã')
  }
  return wards;
}