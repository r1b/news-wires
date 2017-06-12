update news_source
set "urlRegexps" = '{"apnews\\.com/[0-9a-f]{32}"}'
where name = 'AP';

update news_source
set "urlRegexps" = '{"reuters\\.com/article"}'
where name = 'REUTERS';

update news_source
set "urlRegexps" = '{
  "www\\.yahoo\\.com/news",
  "sg\\.news\\.yahoo\\.com",
  "au\\.news\\.yahoo\\.com"
}'
where name = 'AFP';

update news_source
set "urlRegexps" = '{"upi\\.com"}'
where name = 'UPI';

update news_source
set "urlRegexps" = '{"bloomberg\\.com/news/articles"}'
where name = 'BLOOMBERG';
