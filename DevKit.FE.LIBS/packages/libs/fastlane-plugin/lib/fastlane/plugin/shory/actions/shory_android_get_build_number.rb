require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryAndroidGetBuildNumberAction < Action
      def self.run(params)
        gradle_script = File.read(params[:gradle_path])
        begin
          build = /versionCode ([0-9]+)/.match(gradle_script)[1]
        rescue => err
          UI.error("Error reading versionCode: #{err.message}")
        end

        ENV["SHORY_ANDROID_BUILD_NUMBER"] = build
        UI.success("SHORY_ANDROID_BUILD_NUMBER: #{build}")
        return build
      end

      def self.description
        "Get Android build number from versionCode in Gradle file."
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.return_value
        [
          ["SHORY_ANDROID_BUILD_NUMBER", "Build number"]
        ]
      end

      def self.details
        ""
      end

      def self.available_options
        [
          Helper::ShoryHelper.gradle_path
        ]
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
