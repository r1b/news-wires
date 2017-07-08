module.exports = (req, res, next) => {
  res.render('legal', {
    title: req.i18n.__('legal'),
    disclaimerParagraph: req.i18n.__('disclaimer copy'),
    fairUseParagraph: req.i18n.__('fair use copy'),
    locales: req.i18n.locales
  });
};
