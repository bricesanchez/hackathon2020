class TrumpTweetsController < ApplicationController
  def index
    @trump_tweet_columns = [:id, :content, :link]
    # @trump_tweets = TrumpTweet.first(10).as_json(only: @trump_tweet_columns)

    @trump_tweets = TrumpTweet.order(created_at: :desc)
    @trump_tweets = @trump_tweets.search(params[:query]) if params[:query].present?
    @pagy, @trump_tweets = pagy @trump_tweets.reorder(sort_column => sort_direction), items: params.fetch(:count, 10)
  end

  private

  def sort_column
    %w{ id content link }.include?(params[:sort]) ? params[:sort] : "id"
  end

  def sort_direction
    %w{ asc desc }.include?(params[:direction]) ? params[:direction] : "desc"
  end
end
