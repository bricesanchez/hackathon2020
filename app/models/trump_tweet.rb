class TrumpTweet < ActiveRecord::Base
  include PgSearch::Model
  pg_search_scope :search, against: [:content], using: { tsearch: { prefix: true } }
end