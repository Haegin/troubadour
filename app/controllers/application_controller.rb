class ApplicationController < Sinatra::Base
  register Sinatra::Resources

  set :root, File.dirname(File.expand_path('../..', __FILE__))
  set :views, Proc.new { File.join(root, "app", "views") }
  set :sprockets, Sprockets::Environment.new(root)
  set :precompile, [ /\w+\.(?!js|css).+/, /application.(css|js)$/ ]
  set :assets_prefix, "/assets"
  set :digest_assets, ENV['RACK_ENV'] == "production"

  set :sockets, []

  configure do
    %w{javascripts stylesheets images fonts}.each do |type|
      sprockets.append_path File.join("app", "assets", type)
    end
    sprockets.append_path File.join("vendor", "assets", "components")

    sprockets.js_compressor = :uglify if ENV['RACK_ENV'] == "production"

    Sprockets::Helpers.configure do |config|
      config.environment = sprockets
      config.prefix = assets_prefix
      config.digest = digest_assets
      config.public_path = public_folder
    end

    Thread.new do
      loop do
        EM.next_tick do
          if settings.sockets.length > 0
            settings.sockets.each { |s| s.send({type: "ping"}.to_json) }
          end
        end
        sleep 3
      end
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
    if !request.websocket?
      erb :app
    else
      request.websocket do |ws|
        ws.onopen do
          settings.sockets << ws
        end

        ws.onmessage do |msg|
          unless msg =~ /pong|ping/
            EM.next_tick { settings.sockets.each { |s| s.send(msg) } }
          end
        end

        ws.onclose do
          settings.sockets.delete(ws)
        end
      end
    end
  end
end
