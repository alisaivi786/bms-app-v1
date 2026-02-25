require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryDistributeTestflightAction < Action
      def self.run(params)
        changelog = other_action.shory_changelog()

        other_action.upload_to_testflight(
          changelog: changelog,
          skip_submission: true,
          skip_waiting_for_build_processing: true,
          api_key_path: params[:api_key_path],
          ipa: params[:app_path]
        )
      end

      def self.description
        "Upload iOS app to TestFlight."
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.return_value
      end

      def self.details
        "Generates a changelog using the action `shory_changelog` and set it on the TestFlight build."
      end

      def self.available_options
        [
          Helper::ShoryHelper.apple_api_key_path,
          Helper::ShoryHelper.ios_app_path
        ]
      end

      def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
