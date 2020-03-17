'use strict';
const moreConfig = require('../shouldnotpublic.js');

const isInnerIp = ip => {
  return true;
};

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_15959262317_1019';

  // add your config here
  config.middleware = [ 'errorHandler', 'graphql' ];

  // // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // };

  exports.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => isInnerIp(ctx.ip),
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET',
  };

  exports.passportLocal = {
    usernameField: 'name',
    passwordField: 'pass',
  };

  config.passportGithub = moreConfig.passportGithub;

  exports.mongoose = moreConfig.mongoose;

  exports.graphql = {
    router: '/graphql',
    graphiql: true,
  };

  exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  return config;
};
