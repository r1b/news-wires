module.exports = (req, res, next) => {
  res.render('privacy', {
    title: req.i18n.__('privacy policy'),
    privacyPolicy: req.i18n.__('privacy policy copy'),
    locales: req.i18n.locales
  });
};
