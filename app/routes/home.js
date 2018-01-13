module.exports = (app) => {
  app.route('/').get(app.controllers.home.index);
};
