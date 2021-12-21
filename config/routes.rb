Rails.application.routes.draw do

  resources :trump_tweets, only: :index
  resources :dashboards

  resources :state_temperatures
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'dashboards#index'
end
