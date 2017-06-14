const express = require('express');
const moment = require('moment');
const i18n = require('i18n-2');
const models = require('news-wires-db');
const router = express.Router();

const NEWS_ITEMS_PER_PAGE = 20;

router.get('/:page?', function(req, res, next) {
  let page;

  if (!req.params.page) {
    page = 1;
  }
  else {
    page = parseInt(req.params.page);
  }

  if (isNaN(page) || page < 1) {
    res.render('error', {
      message: i18n.__('Error'),
      error: new Error(i18n.__('Invalid page'))
    });
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
      ]
    }).then((result) => {
      let count = result.count;
      let newsItems = result.rows.map((newsItem) => {
        newsItem.fromNow = moment(newsItem.createdAt).fromNow();
        return newsItem;
      });
      res.render('index', {
        count: count,
        newsItems: newsItems,
        page: page,
        newsItemsPerPage: NEWS_ITEMS_PER_PAGE,
        title: i18n.__('news'),
        paginationTitle: i18n.__('More')
      });
    });
  }
});

module.exports = router;
