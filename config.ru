# Require config/environment.rb
require ::File.expand_path('../config/environment',  __FILE__)

require 'sass/plugin/rack'
use Sass::Plugin::Rack

set :app_file, __FILE__
run Sinatra::Application
