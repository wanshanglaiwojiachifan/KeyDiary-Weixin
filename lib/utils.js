/*!
 * keydiarywx - lib/utils.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
// 获取字符串的真实长度
exports.getStrLen = function (str) {
  if (!str || typeof str !== 'string') {
    return 999;
  }
  var count = 0;
  for (var i = 0, l = str.length; i < l; i++) {
    var c = str.charCodeAt(i);
    if (c === 0x0020) {
      continue;
    }
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      count++;
    } else {
      count += 2;
    }
  }
  return count;
};

// 格式化日记内容
// 去除多余的空格
exports.formatDiary = function (content) {
  content = content || '';
  return content.replace(/\s{2,}/g, ' ');
};

