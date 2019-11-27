'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let modelQuery = {};
    const { ctx } = this;
    const { query } = ctx;
    if (Object.keys(query).length) {
      modelQuery = query;
    }
    const data = await ctx.model.Weather.find(modelQuery, 'statistics date');
    this.ctx.body = data;
  }
}

module.exports = HomeController;
