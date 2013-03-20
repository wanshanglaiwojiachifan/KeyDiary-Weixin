/*!
 * keydiarywx - route.js 
 * Copyright(c) 2013 Taobao.com
 * Author: dead_horse <dead_horse@qq.com>
 */


/**
 * Module dependencies.
 */
//var urlrouter = require('urlrouter');
var wechat = require('wechat');
var config = require('./config');

module.exports = function (app) {
  app.use('/weixin/valid', wechat(config.token, function (req, res, next) {
    res.end('hello, weixin!');
  }));
};