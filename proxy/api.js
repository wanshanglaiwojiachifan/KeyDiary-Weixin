/*!
 * keydiarywx - proxy/api.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var urllib = require('urllib');
var utility = require('utility');
var config = require('../config');

var URLS = {
  bind: 'http://api.keydiary.net/accounts/bindwx',
  create: 'http://api.keydiary.net/diaries/upsert'
};

function handleError(err, data, res) {
  if (err) {
    return err;
  }
  if (res.statusCode !== 200) {
    err = new Error('keydiary api http response statusCode is ' + res.statusCode);
    err.statusCode = res.statusCode;
    return err;
  }
  if (data.stat !== 1) {
    err = new Error('keydiary api service response stat is ' + data.stat);
    err.code = data.stat;
    return err;
  }
}
exports.bind = function (email, pwd, openId, callback) {
  var data = {
    openId: openId,
    accessKey: config.accessKey,
    source: config.source
  };
  var headers = {
    Authorization: 'Basic ' + utility.base64encode(email + ':' + pwd)
  };
  urllib.request(URLS.bind, {
    type: 'POST',
    headers: headers,
    data: data
  }, function (err, data, res) {
    err = handleError(err, data, res);
    callback(err);
  });
};

exports.create = function (openId, content, d, callback) {
  var data = {
    content: content,
    d: d,
    sid: config.source,
    accessKey: config.accessKey,
    source: config.source
  };
  var headers = {
    Authorization: 'Basic ' + utility.base64encode('wechat:' + openId)
  };
  urllib.request(URLS.create, {
    type: 'POST',
    headers: headers,
    data: data
  }, function (err, data, res) {
    err = handleError(err, data, res);
    callback(err, err || data.data);
  });
};