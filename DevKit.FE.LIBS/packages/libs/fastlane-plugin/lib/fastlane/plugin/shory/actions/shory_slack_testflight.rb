require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShorySlackTestflightAction < Action
      def self.run(params)
        other_action.slack(
          message: ":testflight: *#{params[:app_name]}* published on TestFlight",
          default_payloads: [],
          attachment_properties: Helper::ShoryHelper.slack_attachments(
            environment: params[:app_environment],
            version: other_action.get_version_number(xcodeproj: params[:xcodeproj_path], target: params[:target]),
            build: other_action.get_build_number(xcodeproj: params[:xcodeproj_path])
          )
        )
      end

      def self.description
        "Send a Slack message for a successful TestFlight distribution."
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
          Helper::ShoryHelper.xcodeproj_path,
          Helper::ShoryHelper.app_name,
          Helper::ShoryHelper.app_environment,
          Helper::ShoryHelper.ios_target
        ]
      end

      def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
