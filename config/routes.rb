Rails.application.routes.draw do
  get 'frontend/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'frontend#index'
  get "*path", to: 'frontend#index'
end
