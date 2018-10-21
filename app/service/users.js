'use strict';
const Service = require('egg').Service;
const fs = require('fs');
const util = require('util')
const readAsync = util.promisify(fs.readFile)

class UsersService extends Service {
    constructor(ctx) {
        super(ctx);
        const baseDir = __dirname + '/../';
        this.opts = {
            cwd: baseDir,
            encoding: 'utf8',
            stdio: [process.stdin, process.stdout, process.stderr]
        }
        this.fileName = baseDir + 'test.js';
    }

    async findUser(fn) {
        let data = await readAsync(this.fileName)
        data = JSON.parse(data)
        return data.find(fn)
    }

    saveUser(users) {
        const {
            fileName,
            opts
        } = this
        fs.writeFileSync(fileName, JSON.stringify(users, null, 2), opts);
    }
}

module.exports = UsersService;