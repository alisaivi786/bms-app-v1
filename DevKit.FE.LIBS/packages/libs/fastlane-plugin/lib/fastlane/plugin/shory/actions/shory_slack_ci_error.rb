require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShorySlackCiErrorAction < Action
      def self.run(params)
        # Check if running in Azure DevOps
        if ENV["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"] && ENV["SYSTEM_TEAMPROJECT"] && ENV["BUILD_BUILDID"]
          pipeline_url = ENV["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"].to_s + ENV["SYSTEM_TEAMPROJECT"].to_s + "/_build/results?buildId=" + ENV["BUILD_BUILDID"].to_s
        else
          pipeline_url = "No pipeline URL available"
        end

        message = ":x: *#{params[:app_name]}* CI build failed"
        latest_commit_message = `git log -1 --pretty=%B`.lines.first.strip # Only the first line
        other_action.slack(
          message: message,
          success: false,
          default_payloads: [],
          attachment_properties: { 
            fields: [{
              title: "Target environment",
              value: params[:app_environment],
              short: true
            },{
              title: "Error details",
              value: "Check the CI logs",
              short: true
            },{
              title: "Git Commit",
              value: latest_commit_message,
              short: true
            },{
              title: "CI logs",
              value: "#{pipeline_url}",
              short: true
            }],
            ts: Time.now().to_i,
          }
        )
      end

      def self.description
        "Send a Slack message for a failed CI build."
      end

      def self.authors
        ["Shory Technologies LLC"]
      end

      def self.return_value
      end

      def self.details
        "Supports running on AzureDevops and includes link to the failed pipeline logs for debugging."
      end

      def self.available_options
        [
          Helper::ShoryHelper.app_name,
          Helper::ShoryHelper.app_environment
        ]
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
