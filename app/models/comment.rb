class Comment < ApplicationRecord
  has_rich_text :body
  validates :associated_model, :body, presence: true
end
