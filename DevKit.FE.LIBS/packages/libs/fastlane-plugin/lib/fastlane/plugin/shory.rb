require 'fastlane/plugin/shory/version'

module Fastlane
  module Shory
    # Return all .rb files inside the "actions", "helper" and "config" directory
    def self.all_classes
      Dir[File.expand_path('**/{actions,helper,config}/*.rb', File.dirname(__FILE__))]
    end
  end
end

# By default we want to import all available actions and helpers
# A plugin can contain any number of actions and plugins
Fastlane::Shory.all_classes.each do |current|
  require current
end
