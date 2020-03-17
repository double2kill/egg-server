'use strict';

const Controller = require('egg').Controller;
const fileUpload = require('express-fileupload');
const path = require('path');

class HomeController extends Controller {
  async middleware() {
    const { req, res } = this.ctx;
    await new Promise(resovle => {
      // how to check error
      fileUpload()(req, res, resovle);
    });
  }
  async index() {
    await this.ctx.render('upload');
  }
  async post() {
    await this.middleware();

    const { req } = this.ctx;

    if (!req.files || Object.keys(req.files).length === 0) {
      this.ctx.throw(500, 'No files were uploaded.');
      return;
    }

    const file = req.files.file;

    const uploadPath = path.join(__dirname, '..', 'public', file.name);

    await new Promise(resolve => {
      file.mv(uploadPath, err => {
        if (err) {
          this.ctx.throw(500, err);
          return;
        }
        this.ctx.body = `文件上传成功：${file.name}`;
        resolve();
      });
    });
  }
}

module.exports = HomeController;
