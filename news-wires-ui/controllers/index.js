const moment = require('moment');
const models = require('news-wires-db');

const NEWS_ITEMS_PER_PAGE = 20;

module.exports = (req, res, next) => {
  let page;

  if (!req.params.page) {
    page = 1;
  }
  else {
    page = parseInt(req.params.page);
  }

  // XXX: Don't really need this anymore - the route takes care of it
  if (isNaN(page) || page < 1) {
    const error = new Error(req.i18n.__('Invalid page'));
    error.status = 404;
    next(error);
  }
  else {
    models.NewsItem.findAndCountAll({
      include: [
        { model: models.NewsSource }
      ],
      limit: NEWS_ITEMS_PER_PAGE,
      offset: NEWS_ITEMS_PER_PAGE * (page - 1),
      order: [
        ['createdAt', 'DESC']
      ],
      where: {
        '$NewsSource.locale$': req.i18n.getLocale()
      }
    }).then((result) => {
      let count = result.count;

      if (result.rows.length == 0) {
        const error = new Error(req.i18n.__('Invalid page'));
        error.status = 404;
        return next(error);
      }

      let newsItems = result.rows.map((newsItem) => {
        moment.locale(newsItem.NewsSource.locale);
        newsItem.fromNow = moment(newsItem.createdAt).fromNow();
        return newsItem;
      });

      res.render('index', {
        count: count,
        newsItems: newsItems,
        page: page,
        newsItemsPerPage: NEWS_ITEMS_PER_PAGE,
        title: req.i18n.__('news'),
        paginationTitle: req.i18n.__('More'),
        locales: req.i18n.locales
      });
    });
  }
};
