Rails.application.routes.draw do
  # API routes should be in /api/v1
  namespace :api do
    namespace :v1 do
      resources :posts
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
