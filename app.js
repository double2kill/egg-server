'use strict';
const assert = require('assert');

module.exports = app => {
  app.passport.verify(async (ctx, user) => {

    // 检查用户
    assert(user.provider, 'user.provider should exists');
    assert(user.id, 'user.id should exists');

    // 是否在数据库中
    const existsUser = await ctx.service.users.findUser(user.id);
    if (existsUser) {
      return existsUser;
    }

    return await ctx.service.users.saveUser(user);
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    return user.user_id;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, userId) => {
    return await ctx.service.users.findUser(userId);
  });
};
