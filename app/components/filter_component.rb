class FilterComponent < ViewComponent::Base
  def initialize(model:, filters:, filter:, filter_type:, reflex:, key:)
    @model = model
    @filters = filters
    @filter = filter
    @filter_type = filter_type
    @reflex = reflex
    @key = key
  end

  def choices
    @model.distinct.pluck(@filter)
  end

  def current_value(filter)
    @filters[filter.to_sym]
  end
end