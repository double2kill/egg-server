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
  router.get('/', controller.home.index);
  app.router.resources('topics', '/api/v2/topics', app.controller.topics);
};