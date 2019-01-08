'use strict';

const Controller = require('egg').Controller;

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type weatherJob {
    id: ID!
    remark: String
  }

  type Query {
    channels(limit: Int, offset: Int): [weatherJob]
  }

  type Mutation {
    createJob(
      remark: String!
      cityName: String!
      users: [String]!
    ): weatherJob,
    deleteJob(id: ID!): weatherJob
  }
`);

class SSHInfoController extends Controller {
  async middleware(ctx) {
    const { req, res } = ctx;
    // const { ctx } = this;
    const root = {
      channels: async ({ offset = 0, limit = 10 }) => {
        if (offset < 0) {
          throw new Error('参数limit不能小于0');
        }
        if (limit < 0) {
          throw new Error('参数offset不能小于0');
        }
        const a = await ctx.model.WeatherJob.find({}).skip(offset).limit(limit);
        return a;
      },
      createJob: async args => {
        const { remark, cityName, users } = args;
        // 需要判断是否创建成功
        return await this.ctx.model.WeatherJob.create({
          remark,
          cityName,
          users,
        });
      },
      deleteJob: async args => {
        const { id } = args;
        // 需要判断是否删除成功
        return await this.ctx.model.WeatherJob.findByIdAndRemove(id);
      },
    };

    const handler = async () => {
      // (request, response, graphQLParams)三个参数分别为这三个，可以做一些日志等
      return {
        schema,
        rootValue: root,
        graphiql: true,
      };
    };

    await graphqlHTTP(handler)(req, res);
  }

  async index() {
    await this.middleware(this.ctx);
  }
}

module.exports = SSHInfoController;
