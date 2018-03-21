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


/* General Configurations
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


/* Error Handling Configurations
----------------------------------------------------------------------*/
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/* MVC Configurations
----------------------------------------------------------------------*/
consign({ cwd: 'app' })
  .include('models')
  .then('controllers')
  .into(app);


module.exports = app;
