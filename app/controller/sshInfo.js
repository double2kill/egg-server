'use strict';

const Controller = require('egg').Controller;

class SSHInfoController extends Controller {
  async index() {
    const { ctx } = this;
    const { user } = ctx.req.query;
    const [ oldServerData, data ] = await Promise.all([
      ctx.service.oldServerSSHInfo.getInfo(user),
      ctx.service.sshInfo.getInfo(user),
    ]);
    this.ctx.body = [ ...oldServerData, ...data ];
  }
}

module.exports = SSHInfoController;
