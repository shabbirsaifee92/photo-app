Rails.application.routes.draw do
  # resources :images
  devise_for :users, :controllers => {:registrations => 'registrations'}
  root 'pages#index'
  get 'services', to: 'pages#services'
  post 'add_image', to: 'albums#add_image'
  resources :albums

  resources :albums do
    resources :images
  end

  resources :games
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
