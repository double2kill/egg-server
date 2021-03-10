'use strict';
module.exports = () => {
  return async function login(ctx, next) {
    const { user } = ctx;
    // 未登录
    if (!user) {
      ctx.status = 401;
      ctx.body = { message: '未登录', code: 'NOT_LOGIN' };
      return;
    }
    return next();
  };
};
