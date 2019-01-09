'use strict';
module.exports = {
  Query: {
    weatherJobs: async (root, { offset = 0, limit = 10 }, ctx) => {
      if (offset < 0) {
        throw new Error('参数limit不能小于0');
      }
      if (limit < 0) {
        throw new Error('参数offset不能小于0');
      }
      const count = await ctx.model.WeatherJob.count();
      const items = await ctx.model.WeatherJob.find({}).skip(offset).limit(limit);
      return {
        count,
        items,
      };
    },
  },
  Mutation: {
    createJob: async (root, { remark, cityName, users }, ctx) => {
      // 需要判断是否创建成功
      return await ctx.model.WeatherJob.create({
        remark,
        cityName,
        users,
      });
    },
    deleteJob: async (root, { id }, ctx) => {
      const result = await ctx.model.WeatherJob.findByIdAndRemove(id);
      if (result === null) {
        // 可能这个id已经被删除了
        throw new Error('删除的id不存在');
      }
      return result;
    },
    deleteAllJobs: async (root, args, ctx) => {
      const { ok, n } = await ctx.model.WeatherJob.remove({});
      return { ok, n };
    },
  },
};
