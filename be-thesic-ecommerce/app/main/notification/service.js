"use strict";

const Models = require("../../db/models");
const BaseServiceCRUD = require("../../base/BaseServiceCRUD");

class NotificationService extends BaseServiceCRUD {
  constructor() {
    super(Models.Notification, "Notification");
  }

  async getNotificationsByUserId(userId) {
    const notifications = await this.model
      .query()
      .where("userId", userId)
      .orderBy("createdAt", "desc");
    return { notifications };
  }

  async countNoti(userId) {
    const quantity = await this.model
      .query()
      .where("userId", userId)
      .andWhere("viewed", false)
      .count("id as count")
      .first();
    return { quantity };
  }

  async updateView(notificationIds, userId) {
    await this.model
      .query()
      .where("userId", userId)
      .whereIn("id", notificationIds)
      .patch({ viewed: true });
    return { success: true };
  }
}

module.exports = NotificationService;
