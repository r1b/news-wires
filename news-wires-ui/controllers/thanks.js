module.exports = (req, res, next) => {
  res.render('thanks', {
    title: req.i18n.__('thanks'),
    alyssa: req.i18n.__('alyssa'),
    patrick: req.i18n.__('patrick'),
    victoria: req.i18n.__('victoria'),
    cryptome: req.i18n.__('cryptome'),
    bkkava: req.i18n.__('bkkava'),
    rebeccas: req.i18n.__('rebeccas'),
    locales: req.i18n.locales
  });
};
