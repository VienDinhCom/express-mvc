module.exports = () => ({

  index: (req, res) => {
    res.render('home', { name: 'World' });
  },

  add: () => {

  },

});
