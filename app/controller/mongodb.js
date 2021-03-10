'use strict';

const Controller = require('egg').Controller;

module.exports = class MongodbController extends Controller {
  async index() {
    const { ctx } = this;
    const { query } = ctx;
    const { projection, ...params } = query;
    const users = await ctx.service.mongodb.queryUser(params, projection);
    ctx.body = users;
  }
};
