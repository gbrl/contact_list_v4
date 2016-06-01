require 'sinatra'
require 'sinatra/cross_origin'

configure do
  enable :cross_origin
end

# Homepage (Root path)
get '/' do
  erb :index
end

namespace '/api' do
  namespace '/v1' do

    get '/' do
      json({ message: "Welcome to the Contact List API" })
    end

    get '/create' do
      json({ message: "You've reached the /create endpoint." })
    end

    get '/update' do
      json({ message: "You've reached the /update endpoint." })
    end

    get '/destroy' do
      json({ message: "You've reached the /destroy endpoint." })
    end

    get '/list' do
      json({ message: "You've reached the /list endpoint." })
    end

  end
end
