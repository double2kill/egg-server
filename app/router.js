'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
    middleware,
  } = app;
  // 挂载鉴权路由
  app.passport.mount('github');

  // 根目录
  router.get('/', controller.home.index);

  // 天气服务api
  router.get('/v0.1/weathers', controller.weathers.index);

  // 用户登陆api
  router.get('/v0.1/sshInfo', controller.sshInfo.index);

  // 上传服务api
  router.get('/v0.1/upload', controller.upload.index);
  router.post('/v0.1/upload', controller.upload.post);

  // mongodb backend
  router.get('/v0.1/mongodb', middleware.login(), controller.mongodb.index);

  // // graphql接口
  // router.get('/v0.1/graphql', controller.graphql.index);
  // router.post('/v0.1/graphql', controller.graphql.index);
};
