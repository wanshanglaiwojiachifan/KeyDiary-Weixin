/*!
 * keydiarywx - lib/tips.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var moment = require('moment');

/**
 * 未注册或者未绑定
 */
exports.bind = '您尚未绑定 KeyDiary 账号！\n点击链接绑定KeyDiary: http://api.keydiary.net/app/accounts/auth?openId=';

/**
 * 不支持的格式
 * @type {String}
 */
exports.notSupport = '公众帐号尚无法响应非文字形式的内容哦！';

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function tplReplace(tpl, params){
  return tpl.replace(/\$(.*?)\$/g, function(total, data) {
    return params[data];
  });
}

function formatDate(d) {
  return moment(d, 'YYYY-MM-DD').format('YYYY年M月D日');
}

var errorMsgContents = [
  '机器人开小差了～稍后回来',
  '关键字日记正在抢修中...请稍候'
];
exports.errorMsg = function () {
  return random(errorMsgContents);
};

var replyMsgContents = {
  newMsg: '亲，今天的关键字是「$content$」，已经帮您妥妥的记录好了～',
  coverMsg: '亲，您把之前记录的「$oldContent$」替换成了「$content$」哦～',
  nightMsg: '亲，已经帮您记录好了。$d$的关键字是「$content$」。安心睡觉哦～ good night!'
};
exports.replyMsg = function (data) {
  if (data.oldContent) {
    return tplReplace(replyMsgContents.coverMsg, data);
  }
  var now = moment();
  var hour = now.hour();
  if (data.d) {
    data.d = formatDate(data.d);
  }
  if (hour < 6 || hour > 22) {
    return tplReplace(replyMsgContents.nightMsg, data);
  }
  return tplReplace(replyMsgContents.newMsg, data);
};

var findMsgContents = [
  '亲，您在$d$记录的关键字是「$content$」!',
  '亲，查到您今天记录的关键字了，是「$content$」!'
];

exports.findMsg = function (data) {
  if (data.d) {
    data.d = formatDate(data.d);
  }
  return tplReplace(random(findMsgContents), data);
};

var notFindMsgContents = [
  '好像今天还没有记录关键字诶，马上记录一条？',
  '找不到今天记录过的关键字喔，马上记录一发？'
];
exports.notFindMsg = function () {
  return random(notFindMsgContents);
};