update news_source
set "locale" = 'en';

insert into news_source values
(DEFAULT, 'AP', 373490841, '{"apnews\\.com/[0-9a-f]{32}"}', 'es');

insert into news_source values
(DEFAULT, 'REUTERS', 201867844, '{"lta\\.reuters\\.com"}', 'es');

insert into news_source values
(DEFAULT, 'UPI', 430091815, '{"espanol\\.upi\\.com"}', 'es');

insert into news_source values
(DEFAULT, 'AFP', 851108442, '{"swissinfo\\.ch","es-us\\.noticias\\.yahoo\\.com"}', 'es');
