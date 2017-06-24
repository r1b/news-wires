module.exports = (req, res, next) => {
  res.render('terms', {
    title: req.i18n.__('terms of service'),
    termsOfService: req.i18n.__('terms of service copy'),
    locales: req.i18n.locales
  });
};
