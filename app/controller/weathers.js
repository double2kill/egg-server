'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Weather.find({}, 'statistics date');
    this.ctx.body = data;
  }
}

module.exports = HomeController;
