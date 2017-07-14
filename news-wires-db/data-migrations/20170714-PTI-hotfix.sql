news_source_id := (select id from news_source where name = 'PTI' and locale = 'en');
update news_integration set "config" = '{
    "url": "http://www.ptinews.com/",
    "linkSelector": ".RightCatDiv :first-of-type .catBottomHead",
    "maxCacheSize": 6
}' where "newsSourceId" = news_source_id;
update news_source set "headlineSelectors" = '{
    "#liheading"
}' where "id" = news_source_id;
