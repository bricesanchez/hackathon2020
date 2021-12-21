module CommentsHelper
  def link_to_dashboard(comment)
    if comment.associated_model == "StateTemperature"
      state_temperatures_path(**JSON.parse(comment.filters))
    end
  end
end
