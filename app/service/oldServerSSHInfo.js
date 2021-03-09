'use strict';
const Service = require('egg').Service;
const moment = require('moment');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const FILE_NAME = 'oldServerSSHInfo.log';
const sshInfoPath = path.join(__dirname, FILE_NAME);

module.exports = class OldSSHInfoService extends Service {
  async getInfo(user = 'liuchen') {
    const cmd = `cat ${sshInfoPath} | grep ${user} | awk '{print $1,$2,$3,$4,$5,$6,$7}'`;
    const { stdout, stderr } = await exec(cmd);
    if (stderr) {
      throw new Error(stderr);
    }
    return this.JSONMap(stdout);
  }

  JSONMap(data) {
    const info = data.split('\n').filter(item => !!item).map(item => {
      const [ name, terminal, year, time1, time2, ip ] = item.split(' ');
      const time = moment(`${year} ${time1} ${time2}`).valueOf();
      return {
        name, terminal, time, ip,
      };
    });
    return info;
  }
};
