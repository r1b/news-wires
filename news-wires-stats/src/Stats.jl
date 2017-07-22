module Stats
    include("Data.jl")
    include("Draw.jl")

    function stats()
        data = make_dataset()

        plot_source_post_frequency(data)
        plot_language_post_frequency(data)

        source_cumsum = make_cumsum(data, [:day, :name], :name)
        plot_source_cum_posts(source_cumsum)

        language_cumsum = make_cumsum(data, [:day, :locale], :locale)
        plot_language_cum_posts(source_cumsum)
    end
end
