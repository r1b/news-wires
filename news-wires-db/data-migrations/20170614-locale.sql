update news_source
set "locale" = 'en';

insert into news_source values
(DEFAULT, 'AP', 373490841, DEFAULT, DEFAULT, '{"apnews\\.com/[0-9a-f]{32}"}', 'es');

insert into news_source values
(DEFAULT, 'REUTERS', 201867844, DEFAULT, DEFAULT, '{"lta\\.reuters\\.com"}', 'es');

insert into news_source values
(DEFAULT, 'AFP', 851108442, DEFAULT, DEFAULT, '{"swissinfo\\.ch","es-us\\.noticias\\.yahoo\\.com"}', 'es');
