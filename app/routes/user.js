module.exports = (app) => {
  app.route('/user/profile').get(app.controllers.user.profile);
};
