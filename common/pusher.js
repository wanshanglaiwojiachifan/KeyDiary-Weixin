/*!
 * keydiarywx - common/pusher.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var logger = require('./logger');

var Pusher = require('pwechat');
var config = require('../config').pwechatConf;

var pusher = Pusher.create(config.email, config.password);

pusher.on('PWechatError', function (err) {
  console.log(err);
});

module.exports = pusher;