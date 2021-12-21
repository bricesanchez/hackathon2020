class ScatterPlotComponent < ViewComponentReflex::Component
  def initialize(model:, available_filters:, filters:, x_key:, y_key:, group_by:)
    @model = model
    @filters = filters
    @group_by = group_by
    @x_key = x_key
    @y_key = y_key
    @available_filters = available_filters
    get_data
  end

  def change_filter
    @filters[element.id.to_sym] = element.value
    get_data
  end

  def get_data
    limit = @filters[:limit]
    @data = @model.where(@filters.to_h.without(:limit)).limit(limit).group_by { |r| r.send(@group_by) }.transform_values { |temps| temps.map { |temp| { x: temp.send(@x_key), y: temp.send(@y_key) } } }
  end

  def self.stimulus_controller
    "scatter-plot-component--scatter-plot-component"
  end
end