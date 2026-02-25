require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryIncrementGooglePlayBuildNumberAction < Action
      def self.run(params)
        playstore_version = other_action.google_play_track_version_codes(
          track: params[:track],
          json_key: params[:api_key_path],
          package_name: params[:package_name]
        )
        build_number = playstore_version.first + 1
        UI.important("Setting build number to #{build_number}")
        other_action.shory_android_set_build_number(
          build_number: build_number,
          gradle_path: params[:gradle_path]
        )
        UI.success("Build number set to #{build_number}")
      end

      def self.description
        "Increment the Google Play build number by 1."
      end

      def self.authors
        ["Shory Technologies LLC"]
      end

      def self.return_value
      end

      def self.details
        "Get the latest build number from Google Play, increment it by 1 and set it in the Gradle build file."
      end

      def self.available_options
        [
          Helper::ShoryHelper.track,
          Helper::ShoryHelper.google_api_key_path,
          Helper::ShoryHelper.android_package_name,
          Helper::ShoryHelper.gradle_path,
        ]
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
