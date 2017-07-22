module Draw
    using Gadfly

    export plot_source_post_frequency, plot_language_post_frequency, plot_source_cum_posts, plot_language_cum_posts

    function plot_source_post_frequency(data)
        p = plot(
            data,
            x="day",
            color="name",
            Geom.histogram,
            Guide.title("Source post frequency"),
            Guide.xlabel("Day of year"),
            Guide.ylabel("Post count"),
            Guide.colorkey("Source name")
        )
        img = SVG("spf.svg", 4inch, 3inch)
        draw(img, p)
    end

    function plot_language_post_frequency(data)
        p = plot(
            data,
            x="day",
            color="locale",
            Geom.histogram,
            Guide.title("Language post frequency"),
            Guide.xlabel("Day of year"),
            Guide.ylabel("Post count"),
            Guide.colorkey("Language code")
        )
        img = SVG("lpf.svg", 4inch, 3inch)
        draw(img, p)
    end

    function plot_source_cum_posts(data)
        p = plot(
            data,
            x="day",
            y="cumsum",
            color="name",
            Geom.line,
            Guide.title("Source cumulative posts"),
            Guide.xlabel("Day of year"),
            Guide.ylabel("Total post count"),
            Guide.colorkey("Source name"),
            Scale.y_continuous(format=:plain)
        )
        img = SVG("scp.svg", 4inch, 3inch)
        draw(img, p)
    end

    function plot_language_cum_posts(data)
        p = plot(
            data,
            x="day",
            y="cumsum",
            color="locale",
            Geom.line,
            Guide.title("Language cumulative posts"),
            Guide.xlabel("Day of year"),
            Guide.ylabel("Total post count"),
            Guide.colorkey("Language code"),
            Scale.y_continuous(format=:plain)
        )
        img = SVG("lcp.svg", 4inch, 3inch)
        draw(img, p)
    end
end
