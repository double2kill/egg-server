'use strict';

const Controller = require('egg').Controller;

class SSHInfoController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.service.sshInfo.getInfo();
    this.ctx.body = data;
  }
}

module.exports = SSHInfoController;
