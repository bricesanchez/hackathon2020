class StateTemperaturesController < ApplicationController
  def index
    puts permitted_params
    @params = permitted_params.empty? ? default_params : permitted_params
    @params = @params
  end

  private

  def permitted_params
    params.permit([ :state, :country, :recordedAt, :averageTemperature, :limit ])
  end

  def default_params
     { country: "Canada", limit: 1000 } 
  end
end
