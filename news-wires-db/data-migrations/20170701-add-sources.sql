insert into news_source values
(DEFAULT, 'IPS', 17650854, DEFAULT, DEFAULT, '{"ipsnews\\.net"}', 'en');

insert into news_source values
(DEFAULT, 'IPS', 42420705, DEFAULT, DEFAULT, '{"ipsnoticias\\.net"}', 'es');

insert into news_source values
(DEFAULT, 'ABR', 876255914235494400, DEFAULT, DEFAULT, '{"agenciabrasil\\.ebc\\.com\\.br/en"}', 'en');

insert into news_source values
(DEFAULT, 'ABR', 876256940401328129, DEFAULT, DEFAULT, '{"agenciabrasil\\.ebc\\.com\\.br/es"}', 'es');

insert into news_source values
(DEFAULT, 'TASS', 1903712426, DEFAULT, DEFAULT, '{"tass\\.com"}', 'en');

insert into news_source values
(DEFAULT, 'PTI', 876258514049617920, DEFAULT, DEFAULT, '{"ptinews\\.com/news"}', 'en');

insert into news_source values
(DEFAULT, 'XNN', 487118986, DEFAULT, DEFAULT, '{"news\\.xinhuanet\\.com/english"}', 'en');

insert into news_source values
(DEFAULT, 'XNN', 722950850, DEFAULT, DEFAULT, '{"spanish\\.xinhuanet\\.com"}', 'es');

do $$
    declare news_source_id integer;
    begin
        news_source_id := (select id from news_source where name = 'ABR' and locale = 'en');
        insert into news_integration values
        (
            DEFAULT,
            'rss',
            '{"url": "http://agenciabrasil.ebc.com.br/en/rss/ultimasnoticias/feed.xml, "maxCacheSize": 15"}'::json,
            'nw_abr_en',
            news_source_id,
            DEFAULT,
            DEFAULT
        );

        news_source_id := (select id from news_source where name = 'ABR' and locale = 'es');
        insert into news_integration values
        (
            DEFAULT,
            'rss',
            '{"url": "http://agenciabrasil.ebc.com.br/es/rss/ultimasnoticias/feed.xml", "maxCacheSize": 15}'::json,
            'nw_abr_es',
            news_source_id,
            DEFAULT,
            DEFAULT
        );

        news_source_id := (select id from news_source where name = 'PTI' and locale = 'en');
        insert into news_integration values
        (
            DEFAULT,
            'web',
            '{"url": "http://www.ptinews.com/", "linkSelector": ".catLatestHeadli", "maxCacheSize": 6}'::json,
            'nw_pti_en',
            news_source_id,
            DEFAULT,
            DEFAULT
        );
    end
$$
