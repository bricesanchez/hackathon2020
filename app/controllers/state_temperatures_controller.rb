class StateTemperaturesController < ApplicationController
  def index
    puts permitted_params
    @params = permitted_params.empty? ? default_params : permitted_params
    @params = @params[:state_temperature]
  end

  private

  def permitted_params
    params.permit(state_temperature: [ :state, :country, :recordedAt, :averageTemperature, :limit ])
  end

  def default_params
     { state_temperature: { country: "Canada", limit: 100 } }  
  end
end
