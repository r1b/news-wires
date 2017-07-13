update news_source set "headlineSelectors" = '{
    ".RightCatDiv :first-of-type .catBottomHead"
}' where name = 'PTI' and locale = 'en';
