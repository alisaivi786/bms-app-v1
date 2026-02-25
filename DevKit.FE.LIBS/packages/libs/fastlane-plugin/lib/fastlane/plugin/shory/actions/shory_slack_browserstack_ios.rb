require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShorySlackBrowserstackIosAction < Action
      def self.run(params)
        platform = Actions.lane_context[Actions::SharedValues::PLATFORM_NAME].to_s
        message = ":browserstack: *#{params[:app_name]} #{platform}* published on BrowserStack"
        other_action.slack(
          message: message,
          default_payloads: [],
          attachment_properties: { 
            fields: [{
              title: "",
              value: "*#{Helper::ShoryHelper.last_commit_message}*",
              short: false
            },{
              title: "",
              value: "https://app-live.browserstack.com/dashboard",
              short: false
            },{
              title: "",
              value: "_#{other_action.shory_ios_app_filename(
                app_environment: params[:app_environment],
                xcodeproj_path: params[:xcodeproj_path],
                target: params[:target]
              )}_",
              short: false
            }]
          }
        )
      end

      def self.description
        "Send a Slack message for a successful iOS Browserstack distribution."
      end

      def self.authors
        ["Shory Technologies LLC"]
      end

      def self.return_value
      end

      def self.details
        "Includes app build version, build number, latest commit message, app filename in Browserstack and link to Browserstack App Live."
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
        true
      end
    end
  end
end
