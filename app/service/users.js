'use strict';
const Service = require('egg').Service;

class UsersService extends Service {
  async findUser(user_id) {
    const { User } = this.ctx.model;
    return await User.findOne({ user_id });
  }

  async saveUser(user) {
    const { User } = this.ctx.model;
    return await User.create({
      user_id: user.id,
      github_info: user,
    });
  }
}

module.exports = UsersService;
