update news_source set "headlineSelectors" = '{
    ".topTitle"
}' where name = 'AP' and locale = 'en';
update news_source set "headlineSelectors" = '{
    ".article-headline"
}' where name = 'REU' and locale = 'en';
update news_source set "headlineSelectors" = '{
    "#SideTop-0-HeadComponentTitle h1",
    ".page-header-title"
}' where name = 'AFP' and locale = 'en';
update news_source set "headlineSelectors" = '{
    ".st_headline"
}' where name = 'UPI' and locale = 'en';
update news_source set "headlineSelectors" = '{
    ".topTitle"
}' where name = 'AP' and locale = 'es';
update news_source set "headlineSelectors" = '{
    "h1[class^=\"ArticleHeader_headline\"]"
}' where name = 'REU' and locale = 'es';
update news_source set "headlineSelectors" = '{
    ".st_headline"
}' where name = 'UPI' and locale = 'es';
update news_source set "headlineSelectors" = '{
    "#SideTop-0-HeadComponentTitle h1",
    "h1[itemprop*=\"headline\"]"
}' where name = 'AFP' and locale = 'es';
update news_source set "headlineSelectors" = '{
    ".entry_title"
}' where name = 'IPS' and locale = 'en';
update news_source set "headlineSelectors" = '{
    ".entry_title"
}' where name = 'IPS' and locale = 'es';
update news_source set "headlineSelectors" = '{
    ".title"
}' where name = 'ABR' and locale = 'en';
update news_source set "headlineSelectors" = '{
    ".title"
}' where name = 'ABR' and locale = 'es';
update news_source set "headlineSelectors" = '{
    ".b-material__title"
}' where name = 'TASS' and locale = 'en';
update news_source set "headlineSelectors" = '{
    "#liheading"
}' where name = 'PTI' and locale = 'en';
update news_source set "headlineSelectors" = '{
    ".Btitle",
    "#bltitle"
}' where name = 'XNN' and locale = 'en';
update news_source set "headlineSelectors" = '{
    "#Title"
}' where name = 'XNN' and locale = 'es';
