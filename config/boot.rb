# Boot file for all environments. See also ApplicationController for base app config.

# Defaults are good
ENV["RACK_ENV"] ||= "development"

# Sort bundler out, based on RACK_ENV
require "bundler/setup"
Bundler.require(:default, ENV["RACK_ENV"].to_sym)

# Should be able to require stuff from app/ & lib/
$LOAD_PATH.unshift File.expand_path(File.join("..", "app"), File.dirname(__FILE__))

Mongoid.load!("./mongoid.yml")

require "models/roll"
require "models/initiative"
require "controllers/application_controller"
require "controllers/api_controller"

module Moped
  module BSON
    class ObjectId
      def to_json(*args)
        to_s.to_json(*args)
      end

      def as_json(*args)
        to_s.as_json(*args)
      end
    end
  end
end
