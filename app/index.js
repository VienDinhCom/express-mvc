const path = require('path');
const logger = require('morgan');
const express = require('express');
const consign = require('consign');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const app = express();


/* View Engine Configurations
----------------------------------------------------------------------*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');


/* Database Configurations
----------------------------------------------------------------------*/


/* Commons Configurations
----------------------------------------------------------------------*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* Session Configurations
----------------------------------------------------------------------*/


/* Passport Configurations
----------------------------------------------------------------------*/


/* MVC Configurations
----------------------------------------------------------------------*/
consign({ cwd: 'app' })
  .include('models')
  .then('controllers')
  .into(app);


/* Error Handling Configurations
----------------------------------------------------------------------*/
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => { // eslint-disable-line
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
