/*!
 * keydiarywx - proxy/simsimi.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var urllib = require('urllib');

var URL = 'http://xiaojiji.duapp.com/simsimi.php?key=';

exports.ask = function (q, callback) {
  urllib.request(URL + q, function (err, data, res) {
    if (err || res.statusCode !== 200) {
      return callback(err || new Error('simsimi response error, statusCode is ' + res.statusCode));
    }
    return callback(null, String(data));
  });
};