class StateTemperaturesController < ApplicationController
  def index
    if permitted_params.empty?
      redirect_to state_temperatures_path(default_params)
    end
    @params = permitted_params
    @comments = Comment.where(associated_model: "StateTemperature")
  end

  private

  def permitted_params
    params.permit([ :country, :from_recordedAt, :to_recordedAt, :averageTemperature, :limit ])
  end

  def default_params
     { country: "Canada", limit: 1000, from_recordedAt: "2010-01-01", to_recordedAt: "2020-01-01" } 
  end
end
