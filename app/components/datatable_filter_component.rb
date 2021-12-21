class DatatableFilterComponent < ViewComponent::Base
  def initialize(turbo_frame_id:, page_count: false, search: false)
    @page_count = page_count
    @search = search
  end
end