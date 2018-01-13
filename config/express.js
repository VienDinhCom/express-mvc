const express = require('express');
const consign = require('consign');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

module.exports = () => {
  // eslint-disable-next-line
  let app = express();

  // Set port to env.Port or default to 3000
  app.set('port', process.env.PORT || 3000);

  // Set view engine
  app.set('view engine', 'ejs');
  app.set('views', 'app/views');

  // Middleware for security
  app.use(helmet());

  // Setup the logger
  app.use(morgan('short'));

  // To support JSON-encoded bodies
  app.use(bodyParser.json());

  // To support URL-encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Use the public folder for static files
  app.use('/assets', express.static('assets'));

  // Configure MVC
  consign({ cwd: 'app' })
    .include('models')
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};
