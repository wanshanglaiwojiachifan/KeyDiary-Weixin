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

app.use('/assets', connect.static(__dirname + '/assets', {maxAge: 86400000}));
app.use(connect.query());
route(app);
app.listen(config.port);