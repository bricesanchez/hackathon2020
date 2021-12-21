Rails.application.routes.draw do
  resources :dashboards do
    collection do
      get :state_temperature
    end
  end
  resources :trump_tweets, only: :index
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'dashboards#index'
end
