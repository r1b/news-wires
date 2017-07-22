module Data
    using DataFrames
    using DataFramesMeta

    export make_dataset, make_cumsum

    function make_dataset()
        sources = rename(readtable("news_source.csv"), :id, :newsSourceId)
        items = readtable("news_item.csv")
        data = join(items, sources, on=:newsSourceId)

        function toDay(column)
            # FIXME : Using `dayofyear` as a hack bc plotting dates doesn't seem to work
            map(s -> Dates.dayofyear(Dates.Date(split(s)[1], "yyyy-mm-dd")), column)
        end

        with_days = transform(data, day=toDay(data[:createdAt]))
        sort(with_days, cols=[:day])
    end

    function make_cumsum(data, sum_cols, cumsum_cols)
        with_sum = by(data, sum_cols) do df
            DataFrame(sum=nrow(df))
        end

        with_cumsum = by(with_sum, cumsum_cols) do df
            DataFrame(cumsum=cumsum(df[:sum]), day=df[:day])
        end
    end
end
