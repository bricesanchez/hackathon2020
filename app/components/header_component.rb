class HeaderComponent < ViewComponent::Base
  def initialize(header)
    @header = header
  end

  def call
    th_content = if @header[:sortable]
                   sort_link_to(@header[:name], @header[:name], class: "table-cell pr-4", data: { turbo_action: "advance" })
                 else
                   @header[:name]
                 end
    tag.th th_content, { scope: "col", class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }
  end

  private

  def sort_link_to(name, column, **options)
    if params[:sort] == column.to_s
      direction = params[:direction] == "asc" ? "desc" : "asc"
    else
      direction = "asc"
    end

    link_to name, request.params.merge(sort: column, direction: direction), **options
  end
end