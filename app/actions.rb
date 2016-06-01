require 'sinatra'
require 'sinatra/cross_origin'

configure do
  enable :cross_origin
end

# Homepage (Root path)
get '/' do
  erb :index
end
