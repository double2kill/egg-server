'use strict';
const Service = require('egg').Service;

module.exports = class MongodbService extends Service {
  async queryUser(...params) {
    const { User } = this.ctx.model;
    const data = await User.find(...params);
    return data;
  }
};
