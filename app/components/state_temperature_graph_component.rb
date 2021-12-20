class StateTemperatureGraphComponent < ViewComponentReflex::Component
  def initialize(from_date: nil, to_date: nil, countries: nil, state: nil, from_temp: nil, to_temp: nil)
    @from_date = from_date
    @to_date = to_date
    @countries = countries
    @state = state
    @from_temp = from_temp
    @to_temp = to_temp
    set_data
  end

  def increment
    @count += 1
  end

  def set_data
    data = StateTemperature
    if @from_date.present? && @to_date.present?
      data = data.where(date: @from_date..@to_date)
    end
    if @countries.present?
      data = data.where(country: @countries)
    end
    if @state.present?
      data = data.where(country: @state)
    end
    if @from_temp.present? && @to_temp.present?
      data = data.where(temp: @from_temp..@to_temp)
    end
    @data = data
  end

  def self.stimulus_controller
    "state-temperature-graph-component--state-temperature-graph-component"
  end
end