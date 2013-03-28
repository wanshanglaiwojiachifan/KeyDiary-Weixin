/*!
 * keydiarywx - controller/diary.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var api = require('../proxy/api');
var utils = require('../lib/utils');
var moment = require('moment');
var tips = require('../lib/tips');
var config = require('../config');

function handleError(err, req, res) {
  err.weixin = req.weixin;
  console.log(err);
  if (err.statusCode === 401) {
    return res.reply([{
      title: '连接KeyDiary',
      description: '您的微信帐号尚未与KeyDiary帐号绑定，点击进行绑定之后继续使用！',
      picurl: config.serverHost + '/assets/image/bind.jpg',
      url: 'http://keydiary.net/app/accounts/auth?openId=' + req.weixin.FromUserName
    }]);  
  }
  if (err.code === 2101) {
    return res.reply('今天的日记长度超过了七个字！请重新记录！');
  }
  return res.reply(tips.errorMsg());
}

function today() {
  var d = moment();
  if (d.hour() < 6) {
    d.subtract('days', 1);
  }
  return d.format('YYYY-MM-DD');
}

exports.create = function (req, res) {
  var content = req.weixin.Content || '';
  var openId = req.weixin.FromUserName;
  content = utils.formatDiary(content);
  if (utils.getStrLen(content) > 14) {
    return res.reply('请用少于七个字记录您的生活！');
  }
  api.create(openId, content, today(), function (err, data) {
    if (err) {
      return handleError(err, req, res);
    }
    res.reply(tips.replyMsg(data));
  });
};

exports.append = function (req, res) {
  var content = req.weixin.Content.slice(2);
  var openId = req.weixin.FromUserName;
  content = utils.formatDiary(content);
  if (utils.getStrLen(content) > 14) {
    return res.reply('请用少于七个字记录您的生活！');
  }
  var d = moment();
  if (d.hour() < 6) {
    d.subtract('days', 1);
  }
  d = d.format('YYYY-MM-DD');
  api.append(openId, content, today(), function (err, data) {
    if (err) {
      return handleError(err, req, res);
    }
    res.reply(tips.replyMsg(data));
  });
};

exports.findToday = function (req, res) {
  var openId = req.weixin.FromUserName;
  api.getOne(openId, today(), function (err, data) {
    if (err) {
      return handleError(err, req, res);
    }
    if (!data) {
      return res.reply(tips.notFindMsg());
    }
    res.reply(tips.findMsg(data));
  });
};