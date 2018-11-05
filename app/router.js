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
  router.get('/weathers', controller.weathers.index);
};
