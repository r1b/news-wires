delete from news_item where "newsSourceId" in
(select id from news_source where name = 'BLOOMBERG');
delete from news_source where news_source.name = 'BLOOMBERG';
update news_source set "name" = 'REU' where name = 'REUTERS';
