'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  // 挂载鉴权路由
  app.passport.mount('github');

  // 根目录
  router.get('/', controller.home.index);

  // 天气服务api
  router.get('/v0.1/weathers', controller.weathers.index);

  // 用户登陆api
  router.get('/v0.1/sshInfo', controller.sshInfo.index);

  // // graphql接口
  // router.get('/v0.1/graphql', controller.graphql.index);
  // router.post('/v0.1/graphql', controller.graphql.index);
};
