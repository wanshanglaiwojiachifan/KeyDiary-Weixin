/*!
 * keydiarywx - proxy/api.js
 * Author: dead_horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var api = require('../../proxy/api');
var urllib = require('urllib');
var mm = require('mm');

describe('proxy/api.js', function () {
  describe('#create', function () {
    afterEach(mm.restore);
    it('should error of opnId', function (done) {
      api.create('mock_id', 'test', '2012-01-01', function (err, data) {
        console.log(data);
        done();
      });
    });
  });
});