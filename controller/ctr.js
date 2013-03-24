/*!
 * keydiarywx - controller/ctr.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var api = require('../proxy/api');
var utils = require('../lib/utils');
var moment = require('moment');

var helpContent =
  'KeyDiary微信公共帐号使用帮助！\n' + 
  '1. 使用需要有KeyDiary的帐号。可以在 http://keydiary.net 注册。\n' + 
  '2. 已注册用户输入"$绑定 您的邮箱 您的密码"来绑定用户。\n' + 
  '3. 输入"$帮助"或者"$help"来查看使用帮助。\n' + 
  '4. 绑定用户之后，直接发送消息记录您今天的生活。（7个以内的文字）。\n' + 
  '5. 记录的时候会把凌晨6点之前发送的都记录到前一天。您可以在睡觉前记录这一天的生活！\n' + 
  '6. 暂时不响应除文字之外的其他输入。\n' + 
  '祝您使用愉快！';

exports.bind = function (req, res) {
  var inputs = req.weixin.Content.split(/\s+/);
  var openId = req.weixin.FromUserName;
  if (inputs.length !== 3) {
    return res.replay('绑定帐号的输入格式为： "$绑定 您的邮箱 您的密码"!');
  }
  api.bind(inputs[1], inputs[2], openId, function (err, data) {
    if (err) {
      err.weixin = req.weixin;
      console.log(err);
      if (err.statusCode === 401) {
        return res.reply('邮箱密码验证失败，请检查并重新绑定！');
      }
      return res.reply('绑定失败，关键字日记正在抢修中...');
    }
    res.replay('帐号绑定成功！七个字，昨日重现！现在开始记录您的生活吧！');
  });
};

exports.create = function (req, res) {
  var content = req.weixin.Content || '';
  var openId = req.weixin.FromUserName;
  content = utils.formatDiary(content);
  if (utils.getStrLen(content) > 7) {
    return res.reply('请用少于七个字记录您的生活！');
  }
  var d = moment();
  if (d.hour() < 6) {
    d.subtract('days', 1);
  }
  d = d.format('YYYY-MM-DD');
  api.create(openId, content, d, function (err, data) {
    if (err) {
      err.weixin = req.weixin;
      console.log(err);
      if (err.statusCode === 401) {
        return res.reply('您还尚未绑定KeyDiary用户！\n' + helpContent);
      }
      return res.reply('关键字日记正在抢修中...请稍后重新记录');
    }
    res.replay('记录成功！' + data.d + '的关键字为' + data.content);
  });
};

exports.help = function (req, res) {
  res.reply(helpContent);
};