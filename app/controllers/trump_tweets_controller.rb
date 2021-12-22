class TrumpTweetsController < ApplicationController
  def index
    @filters = tweets_params
  end

  # GET
  def tweets
    @trump_tweet_columns = [:id, :content, :link]
    @trump_tweets = TrumpTweet.order(created_at: :desc)
    @trump_tweets = @trump_tweets.search(params[:query]) if params[:query].present?
    @pagy, @trump_tweets = pagy @trump_tweets.reorder(sort_column => sort_direction), items: params.fetch(:count, 10)
  end

  # GET
  def pie_chart
    default_filters = { from_date: "2010-01-01", to_date: "2021-01-01", divider: 1}
    @filters = default_filters.merge(pie_chart_params)
    divider = @filters[:divider].to_i
    trump_tweets = TrumpTweet.where(publishedAt: @filters[:from_date]..@filters[:to_date])
    @trump_tweets_per_slice = trump_tweets.group("(DATE_PART('hour', \"publishedAt\") / #{divider})").sum(:retweets).group_by { |k,v| k.to_i * divider }.transform_values { |v| v.sum { |h| h[1]} }
  end

  # POST
  def update_chart
    pie_chart
    respond_to do |format|
      format.turbo_stream
    end
  end

  private

  def tweets_params
    params.permit(:query, :count)
  end

  def pie_chart_params
    params.permit(:from_date, :to_date, :divider).to_h.symbolize_keys
  end

  def sort_column
    %w{ id content link }.include?(params[:sort]) ? params[:sort] : "id"
  end

  def sort_direction
    %w{ asc desc }.include?(params[:direction]) ? params[:direction] : "desc"
  end
end
