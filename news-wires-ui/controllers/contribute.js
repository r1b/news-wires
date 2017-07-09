module.exports = (req, res, next) => {
  res.render('contribute', {
    title: req.i18n.__('contribute'),
    codeSection: req.i18n.__('code'),
    codeCopy: req.i18n.__('code copy'),
    donateSection: req.i18n.__('donate'),
    donateCopy: req.i18n.__('donate copy'),
    translateSection: req.i18n.__('translate'),
    translateCopy: req.i18n.__('translate copy'),
    suggestSection: req.i18n.__('suggest a source'),
    suggestCopy: req.i18n.__('suggest copy'),
    locales: req.i18n.locales
  });
};
