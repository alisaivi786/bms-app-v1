require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShorySlackGooglePlayAction < Action
      def self.run(params)
        other_action.slack(
          message: ":google-play: *#{params[:app_name]}* published on Google Play",
          default_payloads: [],
          attachment_properties: Helper::ShoryHelper.slack_attachments(
            environment: params[:app_environment],
            version: other_action.shory_android_get_version_number(gradle_path: params[:gradle_path]),
            build: other_action.shory_android_get_build_number(gradle_path: params[:gradle_path])
          )
        )
      end

      def self.description
        "Send a Slack message for a successful Google Play distribution."
      end

      def self.authors
        ["Shory Technologies LLC"]
      end

      def self.return_value
      end

      def self.details
        "Includes app build version, build number and latest commit message."
      end

      def self.available_options
        [
          Helper::ShoryHelper.gradle_path,
          Helper::ShoryHelper.app_name,
          Helper::ShoryHelper.app_environment
        ]
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
