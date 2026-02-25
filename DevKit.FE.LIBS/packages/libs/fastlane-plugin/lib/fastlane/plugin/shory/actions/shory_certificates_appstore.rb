require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryCertificatesAppstoreAction < Action
      def self.run(params)
        other_action.match(
          app_identifier: params[:app_identifier],
          api_key_path: params[:api_key_path],
          storage_mode: "git",
          clone_branch_directly: true,
          git_url: params[:git_url],
          git_branch:  params[:match_git_branch],
          type: "appstore",
          readonly: other_action.is_ci
        )      
      end

      def self.description
        "Install all required certificates and provisioning profiles for AppStore distribution."
      end

      def self.authors
        ["Shory Technologies LLC"]
      end

      def self.return_value
      end

      def self.details
        "Uses the fastlane match action to install all required certificates and provisioning profiles for AppStore distribution. 
By default it supports running on AzureDevops by using the URL specified in the MATCH_GIT_URL environment variable. 
If not found, it will use the default git URL for the fastlane-certificates repository found in Shory Platform.
You can override this by specifying the git_url parameter to use a different repository."
      end

      def self.available_options
        [
          Helper::ShoryHelper.app_identifiers,
          Helper::ShoryHelper.apple_api_key_path,
          Helper::ShoryHelper.git_url,
          Helper::ShoryHelper.match_git_branch
        ]
      end

      def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
