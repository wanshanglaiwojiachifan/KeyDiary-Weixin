/*!
 * keydiarywx - common/logger.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */

var logger = {};
['info', 'debug', 'warn', 'error'].forEach(function (level) {
  logger[level] = function () {
    console.log.apply(console, arguments);
  };
});

module.exports = logger;