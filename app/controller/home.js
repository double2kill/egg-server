'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {
      ctx
    } = this
    const {
      user
    } = ctx
    // 未登录
    if (user === undefined) {
      ctx.session.returnTo = ctx.path;
      await ctx.redirect('/passport/github');
      return
    }
    this.ctx.body = `hi, ${user.name}`;
  }
}

module.exports = HomeController;