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
var ctr = require('./controller/ctr');

module.exports = function (app) {
  app.use('/weixin', wechat(config.token, function (req, res) {
    if (req.weixin.MsgType !== 'text') {
      return ctr.help(req, res);
    }
    var content = req.weixin.Content || '';
    if (content.indexOf('$绑定') === 0) {
      return ctr.bind(req, res);
    }
    if (content.indexOf('$help') === 0 || content.indexOf('$帮助') === 0) {
      return ctr.help(req, res);
    }
    return ctr.create(req, res);
  }));
};