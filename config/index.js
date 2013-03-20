/*!
 * keydiarywx - config/index.js
 * Copyright(c) 2012 Taobao.com
 * Author: dead_horse <dead_horse@qq.com>
 */

"use strict";

/**
 * Module dependencies.
 */
var path = require('path');
var fs = require('fs');

var config = {
  port: 8080,
  token: 'input weixin token'
};

var customConfig = path.join(__dirname, 'config.js');
// 非测试环境需要加载相应对配置文件
if (process.env.NODE_ENV !== 'test' && fs.existsSync(customConfig)) {
  var options = require(customConfig);
  for (var k in options) {
    config[k] = options[k];
  }
}

// 判断是否服务是否在线
config.onlineStatusFile = path.join(path.dirname(__dirname), 'public', 'status.taobao');

module.exports = config;
