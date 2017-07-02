update news_source set "headlineSelector" = '#liheading' where name = 'PTI';
update news_source set "headlineSelector" = '#bltitle' where name = 'XNN' and locale = 'en';
update news_source set "headlineSelector" = '#Title' where name = 'XNN' and locale = 'es';
