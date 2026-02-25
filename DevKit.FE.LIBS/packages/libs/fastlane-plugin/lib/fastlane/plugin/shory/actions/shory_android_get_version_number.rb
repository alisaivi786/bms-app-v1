require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryAndroidGetVersionNumberAction < Action
      def self.run(params)
        gradle_script = File.read(params[:gradle_path])
        begin
          version = /versionName\s+"([\d\.]+)"/.match(gradle_script)[1]
        rescue => err
          UI.error("Error reading versionName: #{err.message}")
        end

        ENV["SHORY_ANDROID_VERSION_NUMBER"] = version
        UI.success("SHORY_ANDROID_VERSION_NUMBER: #{version}")
        return version
      end

      def self.description
        "Get Android version number from versionName in Gradle file."
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.return_value
        [
          ["SHORY_ANDROID_VERSION_NUMBER", "Version number"]
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
