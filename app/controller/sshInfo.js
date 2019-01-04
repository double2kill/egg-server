'use strict';

const Controller = require('egg').Controller;

class SSHInfoController extends Controller {
  async index() {
    const { ctx } = this;
    const { user } = ctx.req.query;
    const data = await ctx.service.sshInfo.getInfo(user);
    this.ctx.body = data;
  }
}

module.exports = SSHInfoController;
