'use strict';
const Service = require('egg').Service;
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const moment = require('moment');

class SSHInfoService extends Service {
  async getInfo(user = 'liuchen') {
    const cmd = `who /var/log/wtmp | grep ${user} | awk '{print $1,$2,$3,$4,$5}'`;
    const { stdout, stderr } = await exec(cmd);
    const data = this.JSONMap(stdout);
    return stderr || data;
  }

  JSONMap(data) {
    const info = data.split('\r\n').filter(item => !!item).map(item => {
      const [ name, terminal, time1, time2, ip ] = item.split(' ');
      const time = moment(`${time1} ${time2}`).valueOf();
      return {
        name, terminal, time, ip,
      };
    });
    return info;
  }
}

module.exports = SSHInfoService;
