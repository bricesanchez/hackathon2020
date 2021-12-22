class CommentsController < ApplicationController
  include CommentsHelper

  def new
    associated_model = params[:associated_model]
    @comment = Comment.new(associated_model: associated_model, filters: permitted_filters.to_h.to_json)
  end

  def create
    @comment = Comment.new(permitted_params)
    if @comment.save
      respond_to do |format|
        format.html do
          redirect_to link_to_dashboard(@comment)
        end
        format.turbo_stream
      end
    else
      render :new
    end
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def validate_new
    @comment = Comment.new(permitted_params)
    @comment.validate
    respond_to do |format|
      format.turbo_stream
    end
  end

  def validate_edit
  end

  private

  def permitted_filters 
    params.permit([:country, :from_recordedAt, :to_recordedAt, :averageTemperature, :limit])
  end  

  def permitted_params
    params.require(:comment).permit(:body, :filters, :associated_model)
  end
end
