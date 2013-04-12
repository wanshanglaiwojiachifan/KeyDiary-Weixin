/*!
 * keydiarywx - controller/prompt.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var tips = require('../lib/tips');
var config = require('../config');
var logger = require('../common/logger');
var api = require('../proxy/api');

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

exports.handleBind = function (req, res) {
  var weixin = req.weixin;
  api.bind(weixin.FromUserName, weixin.Content, weixin.CreateTime, function (err, data) {
    if (err) {
      res.reply(tips.errorMsg());
    }
    console.log(err, data);
    res.reply(data);
  });
};
// exports.autoResponse = function (req, res) {
//   Simsimi.ask(req.weixin.Content, function (err, data) {
//     if (err) {
//       logger.error(err);
//       return res.reply(tips.errorMsg());
//     }
//     res.reply(data);
//   });
// };
