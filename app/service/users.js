'use strict';
const Service = require('egg').Service;
const moment = require('moment');

class UsersService extends Service {
  async findUser(user_id) {
    const { User } = this.ctx.model;
    const targetUser = await User.findOne({ user_id });
    const { updated_at } = targetUser;
    if (moment().subtract(10, 'seconds').valueOf() > moment(updated_at).valueOf()) {
      return null;
    }
    return await User.findOne({ user_id });
  }

  async saveUser(user) {
    const { User } = this.ctx.model;
    const hasUser = await User.findOne({ user_id: user.id });
    if (hasUser) {
      return await User.updateOne({ user_id: user.id }, {
        user_id: user.id,
        github_info: user,
      });
    }
    return await User.create({
      user_id: user.id,
      github_info: user,
    });
  }
}

module.exports = UsersService;
