class ApplicationController < Sinatra::Base
  register Sinatra::Resources

  set :root, File.dirname(File.expand_path('../..', __FILE__))
  set :views, Proc.new { File.join(root, "app", "views") }
  set :sprockets, Sprockets::Environment.new(root)
  set :precompile, [ /\w+\.(?!js|css).+/, /application.(css|js)$/ ]
  set :assets_prefix, "/assets"
  set :digest_assets, false

  configure do
    %w{javascripts stylesheets images fonts}.each do |type|
      sprockets.append_path File.join("app", "assets", type)
    end
    sprockets.append_path File.join("vendor", "assets", "components")

    Sprockets::Helpers.configure do |config|
      config.environment = sprockets
      config.prefix = assets_prefix
      config.digest = digest_assets
      config.public_path = public_folder
    end
  end

  helpers do
    include Sprockets::Helpers
  end

  configure :development do
    register Sinatra::Reloader
    set :show_exceptions, false
  end

  get "/" do
    erb :app
  end
end
