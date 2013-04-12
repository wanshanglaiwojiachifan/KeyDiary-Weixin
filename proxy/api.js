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
var pusher = require('../common/pusher');

var URLS = {
  upsert: 'http://api.keydiary.net/diaries/upsert',
  getOne: 'http://api.keydiary.net/diaries/one',
  append: 'http://api.keydiary.net/diaries/append'
};

function handleResponse(err, data, res) {
  if (err) {
    return {error: err};
  }
  if (res.statusCode !== 200) {
    err = new Error('keydiary api response error');
    err.statusCode = res.statusCode;
  }
  try {
    data = JSON.parse(data);
  } catch (e) {
    err = err ? err : new Error('parse data error');
    err.data = String(data);
    return {error: err};
  }
  if (data.stat !== 1) {
    err = err ? err : new Error('keydiary api response error');
    err.code = data.stat;
  }
  if (err) {
    return {error: err};
  }
  return {data: data};
}

exports.getOne = function (openId, d, callback) {
  var data = {
    d: d,
    sid: config.source,
    accessKey: config.accessKey,
    source: config.source
  };
  var headers = {
    Authorization: 'Basic ' + utility.base64encode('wechat:' + openId)
  };
  urllib.request(URLS.getOne, {
    type: 'GET',
    data: data,
    headers: headers
  }, function (err, data, res) {
    var result = handleResponse(err, data, res);
    callback(result.error, result.data ? result.data.data : null);
  });
};

exports.create = function (openId, content, d, callback) {
  exports.getOne(openId, d, function (err, oldData) {
    if (err) {
      return callback(err);
    }
    var data = {
      content: content,
      d: d,
      source: config.source,
      sid: config.source,
      accessKey: config.accessKey
    };
    var headers = {
      Authorization: 'Basic ' + utility.base64encode('wechat:' + openId)
    };
    urllib.request(URLS.upsert, {
      type: 'POST',
      headers: headers,
      data: data
    }, function (err, data, res) {
      var result = handleResponse(err, data, res);
      result.data.data.oldContent = oldData ? oldData.content : null;
      callback(result.error, result.data ? result.data.data : null);
    });
  });
};

exports.append = function (openId, content, d, callback) {
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
  urllib.request(URLS.append, {
    type: 'POST',
    headers: headers,
    data: data
  }, function (err, data, res) {
    var result = handleResponse(err, data, res);
    callback(result.error, result.data ? result.data.data : null);
  });
};

exports.bind = function (openId, keyWord, timestamp, callback) {
  setTimeout(function () {
    pusher.getMessage(keyWord, 1, 10000000, function (err, data) {
      if (err) {
        return callback(err);
      }
      for (var i = 0, l = data.length; i < l; i++) {
        var msg = data[i];
        if (msg.dateTime === timestamp) {
          return callback(null, msg.fakeId);
        }
      }
      callback(null, null);
    });
  }, 2000);
}