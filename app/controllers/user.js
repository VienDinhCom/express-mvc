module.exports = (app) => {
  app.route('/user/profile').get((req, res) => {
    res.render('user/profile', { username: 'Maxvien' });
  });
};
