require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryAndroidSetBuildNumberAction < Action
      def self.run(params)
        sh("sed -i'.old' -E 's/versionCode [0-9]+\$/versionCode #{params[:build_number]}/' #{params[:gradle_path]}")
      end

      def self.description
        "Set Android build number in the Gradle file."
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.return_value
      end

      def self.details
        ""
      end

      def self.available_options
        [
          Helper::ShoryHelper.gradle_path,
          Helper::ShoryHelper.build_number,
        ]
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
