'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');

class Notification extends CustomModel {
  static get tableName() {
    return 'notification';
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      user: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'notification.userId',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Notification;