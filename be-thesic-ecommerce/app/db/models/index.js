'use strict';

const knex = require('../connection');
const User = require('./User');
const Role = require('./Role');
const Blog = require('./Blog');
const Category = require('./Category');
const Discount = require('./Discount');
const Favorite = require('./Favorite');
const Order = require('./Order');
const OrderDetail = require('./OrderDetail');
const Product = require('./Product');
const Rating = require('./Rating');
const Producer = require('./Producer');
const Contact = require('./Contact');
const ProductInventory = require('./ProductInventory')
const InventoryLogs = require('./InventoryLogs')
const Promotion = require('./Promotion')
const PromotionProduct = require('./PromotionProduct')
const Banner = require('./Banner')
const Notification = require('./Notification')
const Slider = require('./Slider')
const SliderItem = require('./SliderItem')
const Transaction = require('./Transaction')
module.exports = {
  knex,
  User,
  Role,
  Blog,
  Category,
  Discount,
  Favorite,
  Order,
  OrderDetail,
  Product,
  Rating,
  Producer,
  Contact,
  ProductInventory,
  InventoryLogs,
  Promotion,
  PromotionProduct,
  Banner,
  Notification,
  Slider,
  SliderItem, 
  Transaction
};
