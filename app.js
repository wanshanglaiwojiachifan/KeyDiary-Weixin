/*!
 * keydiarywx - app.js 
 * Copyright(c) 2013 Taobao.com
 * Author: dead_horse <dead_horse@qq.com>
 */


/**
 * Module dependencies.
 */
var connect = require('connect');
var config = require('./config');
var route = require('./route');

var app = connect();

app.use(connect.query());

route(app);
app.listen(config.port);