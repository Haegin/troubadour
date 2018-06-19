source "https://rubygems.org"

ruby "2.5.1"

gem "sinatra"
gem "sinatra-resources", require: "sinatra/resources"
gem "mongoid"
gem "sprockets"
gem "sprockets-helpers"
gem "sprockets-es6", require: "sprockets/es6"
gem "sass"
gem "uglifier"
gem "therubyracer"
gem "rack-contrib"
gem "sinatra-websocket"

group :development do
  gem "sinatra-contrib", require: "sinatra/reloader"
  gem 'guard-rspec', require: false
  gem "shotgun"
  gem "pry"
  gem "foreman", require: false
end

group :test do
  gem "rspec"
  gem "rack-test"
  gem "database_cleaner"
end
