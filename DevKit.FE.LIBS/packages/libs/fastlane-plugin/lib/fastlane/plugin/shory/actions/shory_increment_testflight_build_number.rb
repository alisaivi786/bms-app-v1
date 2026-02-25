require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryIncrementTestflightBuildNumberAction < Action
      def self.run(params)
        # Get latest build number
        version_number = other_action.get_version_number(
          xcodeproj: params[:xcodeproj_path],
          target: params[:target]
        )

        testflight_build_number = other_action.latest_testflight_build_number(
          version: version_number,
          api_key_path: params[:api_key_path],
          app_identifier: params[:app_identifier]
        )
  
        # Increase build number
        build_number = testflight_build_number + 1
        UI.important("Setting build number to #{build_number}")
        
        # Set build number
        other_action.increment_build_number(
          build_number: build_number,
          xcodeproj: params[:xcodeproj_path]
        )
      end

      def self.description
        "Increment the TestFlight build number by 1."
      end

      def self.authors
        ["Shory Technologies LLC"]
      end

      def self.return_value
      end

      def self.details
        "Get the latest TestFlight build number from App Store Connect, increment it by 1 and set it in the Xcode project."
      end

      def self.available_options
        [
          Helper::ShoryHelper.configuration,
          Helper::ShoryHelper.scheme,
          Helper::ShoryHelper.ios_target,
          Helper::ShoryHelper.xcodeproj_path,
          Helper::ShoryHelper.app_identifier,
          Helper::ShoryHelper.apple_api_key_path
        ]
      end

      def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
