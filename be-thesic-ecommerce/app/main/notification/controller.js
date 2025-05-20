'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const NotificationService = require('./service');

class NotificationController extends BaseControllerCRUD {
  constructor() {
    super(new NotificationService());
  }

  async getByUserId(request) {
    try {
      return await this.service.getNotificationsByUserId(request.query.userId);
    } catch (err) {
      throw err;
    }
  }

  async countNoti(request) {
    try {
      return await this.service.countNoti(request.query.userId);
    } catch (err) {
      throw err;
    }
  }

  async updateView(request) {
    try {
      const { payload } = request;
      return await this.service.updateView(request.payload.notificationIds, request.payload.userId)
    } catch (err) {
      console.log("=====================loi checkout:", err);
      throw err;
    }
  }
}

module.exports = NotificationController;
