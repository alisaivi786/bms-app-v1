require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShorySlackBrowserstackAndroidAction < Action
      def self.run(params)
        message = ":browserstack: *#{params[:app_name]} Android* published on BrowserStack"
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
              value: "_#{other_action.shory_android_generate_app_filename(
                app_environment: params[:app_environment],
                gradle_path: params[:gradle_path],
              )}_",
              short: false
            },{
              title: "",
              value: "https://app-live.browserstack.com/dashboard",
              short: false
            }]
          }
        )
      end

      def self.description
        "Send a Slack message for a successful Android Browserstack distribution."
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
