'use strict';

const isInnerIp = (ip) => {
  return true
}

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_15959262317_1019';

  // add your config here
  config.middleware = ['errorHandler'];

  // // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // };

  exports.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => isInnerIp(ctx.ip),
    },
  }

  exports.passportLocal = {
    usernameField: 'name',
    passwordField: 'pass',
  };

  config.passportGithub = {
    key: '6c3ed0ab6bdf5e72dc8f57',
    secret: '708a7a6a7f5885c1a3d8fa56a3bf6c4f82e963001',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  };

  return config;
};