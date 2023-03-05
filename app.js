var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');

var routes = require('@routes/index')
const { NotFoundHandler, ErrorHandler } = require('@middlewares/error-handler');
const { morganStream, logFormat } = require('@utils/logger')
const cors = require ('cors')

var app = express();

app.use(logger(logFormat, { stream: morganStream })) // write to .log
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(routes);

// catch 404 and forward to error handler
app.use(NotFoundHandler)
// error handler
app.use(ErrorHandler)

module.exports = app;
