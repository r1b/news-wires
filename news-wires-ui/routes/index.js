var express = require('express');
var models = require('news-wires-db');
var router = express.Router();

const NEWS_ITEMS_PER_PAGE = 30

router.get('/:page?', function(req, res, next) {
  let page;

  if (!req.params.page) {
    page = 1;
  }
  else {
    page = parseInt(req.params.page);
  }

  if (isNaN(page)) {
    res.render('error', { message: "Error", error: new Error('Invalid page') });
  }
  else {
    models.NewsItem.findAll({
      include: [
        { model: models.NewsSource }
      ],
      limit: NEWS_ITEMS_PER_PAGE,
      offset: NEWS_ITEMS_PER_PAGE * (page - 1),
      order: [
        ['createdAt', 'DESC']
      ]
    }).then((newsItems) => {
      res.render('index', { newsItems: newsItems, page: page, title: 'news'});
    });
  }
});

module.exports = router;
