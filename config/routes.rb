Rails.application.routes.draw do
  resources :trump_tweets, only: :index do
    collection do
      get :rows
      get :pie_chart
      post :update_chart
    end
  end
  resources :comments do
    collection do
      post :validate_new
    end
    post :validate_edit
  end
  resources :dashboards

  resources :state_temperatures
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'state_temperatures#index'
end
