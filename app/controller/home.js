'use strict';

const Controller = require('egg').Controller;

const BACK_URL = 'BACK_URL';
const USER_NAME = 'USER_NAME';

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { user, query } = ctx;

    const { backURL: queryBackURL } = query;

    if (queryBackURL) {
      ctx.cookies.set(BACK_URL, queryBackURL);
    }

    // 未登录
    if (!user) {
      ctx.session.returnTo = ctx.path;
      await ctx.redirect('/passport/github');
      return;
    }

    // login: get backURL from query
    // no login: github redirect callback "/" and get backURL from cookie

    const userName = user.github_info.name;
    ctx.cookies.set(USER_NAME, userName);

    const backURL = queryBackURL || ctx.cookies.get(BACK_URL);

    if (backURL) {
      ctx.cookies.set(BACK_URL, null);
      await ctx.redirect(`${backURL}?user=${userName}`);
      return;
    }
    this.ctx.body = `Hi, ${userName}!`;
  }
}

module.exports = HomeController;
