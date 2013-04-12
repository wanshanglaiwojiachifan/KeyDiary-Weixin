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
var diary = require('./controller/diary');
var prompt = require('./controller/prompt');

module.exports = function (app) {
  app.use('/weixin', wechat(config.token, function (req, res) {
    if (req.weixin.MsgType !== 'text') {
      return prompt.help(req, res);
    }
    var content = req.weixin.Content || '';
    if (content.indexOf('@help') === 0 || content.indexOf('@帮助') === 0) {
      return prompt.help(req, res);
    }
    if (content.indexOf('@+') === 0) {
      return diary.append(req, res);
    }
    if (content.indexOf('@1') === 0) {
      return diary.findToday(req, res);
    }
    if (content.indexOf('@提醒') === 0) {
      return prompt.handleBind(req, res);
    }
    return diary.create(req, res);
  }));
};