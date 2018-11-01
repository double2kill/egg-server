'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { user } = ctx;
    // 未登录
    if (user === undefined) {
      ctx.session.returnTo = ctx.path;
      await ctx.redirect('/passport/github');
      return;
    }
    this.ctx.body = `hi, ${user.github_info.name}`;
  }
}

module.exports = HomeController;
