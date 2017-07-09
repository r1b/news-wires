module.exports = (req, res, next) => {
  res.render('legal', {
    title: req.i18n.__('Contribute'),
    codeSection: req.i18n.__('Code'),
    codeCopy: req.i18n.__('code copy'),
    donateSection: req.i18n.__('Donate'),
    donateCopy: req.i18n.__('donate copy'),
    translateSection: req.i18n.__('Translate'),
    translateCopy: req.i18n.__('translate copy'),
    suggestSection: req.i18n.__('Suggest a source'),
    suggestCopy: req.i18n.__('suggest copy'),
    locales: req.i18n.locales
  });
};
