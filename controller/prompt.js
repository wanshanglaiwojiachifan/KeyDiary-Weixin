/*!
 * keydiarywx - controller/prompt.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var tips = require('../lib/tips');
var config = require('../config');

exports.help = function (req, res) {
  res.reply([{
    title: '使用帮助',
    description: 'KeyDiary 微信公众帐号使用帮助',
    picurl: config.serverHost + '/assets/image/help.jpg',
    url: config.serverHost + '/assets/help.html?openId=' + req.weixin.FromUserName
  }]);
};

exports.notSupport = function (req, res) {
  res.reply(tips.notSupport);
};

exports.autoResponse = function (req, res) {
  Simsimi.ask(req.weixin.Content, function (err, data) {
    if (err) {
      console.log(err);
      return res.reply(tips.errorMsg());
    }
    res.reply(data);
  });
};