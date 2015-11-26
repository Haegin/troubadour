class ApiController < Sinatra::Base
  register Sinatra::Resources

  configure :development do
    register Sinatra::Reloader
    set :show_exceptions, false
  end

  error Mongoid::Errors::UnknownAttribute do |ex|
    status 400
    { "error" => ex.message.split("\n")[2].strip }.to_json
  end

  resource :rolls do
    get do
      limit = [Integer(params[:limit]) || 10, 50].min
      Roll.order_by(_id: "desc").limit(limit).map(&:to_hash).to_json
    end

    post do
      Roll.create!(params[:roll]).to_hash.to_json
    end

    member do
      get do |id|
        Roll.find(id).to_hash.to_json
      end

      put do |id|
        roll = Roll.find(id)
        roll.update(params[:roll])
        roll.to_hash.to_json
      end

      delete do |id|
        Roll.find(id).destroy
      end
    end
  end

  resource :initiatives do
    get do
      Initiative.all.map(&:to_hash).to_json
    end

    post do
      init = Initiative.find_or_initialize_by(name: params[:initiative][:name])
      init.update(result: params[:initiative][:result])
      init.to_hash.to_json
    end
  end
end
