require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryBuildIosAppstoreAction < Action
      def self.run(params)
        # Install AppStore certificates and provisioning profiles
        other_action.shory_certificates_appstore(
          app_identifier: params[:app_identifier],
          api_key_path: params[:api_key_path],
          git_url: params[:git_url],
          match_git_branch: params[:match_git_branch],
        )

        # Increment TestFlight build number and set it in the Xcode project
        # This is necessary to ensure that the build number is unique
        # for each build uploaded to TestFlight or it will be rejected by Apple
        other_action.shory_increment_testflight_build_number(
          app_identifier: params[:app_identifier],
          api_key_path: params[:api_key_path],
          xcodeproj_path: params[:xcodeproj_path],
          scheme: params[:scheme],
          target: params[:target],
          configuration: params[:configuration]
        )

        # React Native uses CocoaPods to install iOS dependencies
        other_action.cocoapods(
          podfile: params[:ios_project_dir]
        )

        app_filename = other_action.shory_ios_app_filename(
          app_name: params[:app_name],
          app_environment: params[:app_environment], 
          xcodeproj_path: params[:xcodeproj_path],
          target: params[:target]
        )

        # Build the app
        xcodebuild_formatter = ENV["FIRSTTECH_DEBUG"] ? "" : "xcbeautify --renderer azure-devops-pipelines"
        other_action.gym(
          workspace: params[:xcode_workspace_path],
          scheme: params[:scheme],
          configuration: params[:configuration],
          output_directory: params[:app_path_prefix],
          output_name: app_filename,
          clean: true,
          silent: true,
          build_timing_summary: true,
          analyze_build_time: true,
          xcodebuild_formatter: xcodebuild_formatter
        )

        app_path = other_action.shory_ios_app_path(
          app_name: params[:app_name],
          app_environment: params[:app_environment],
          xcodeproj_path: params[:xcodeproj_path],
          app_path_prefix: params[:app_path_prefix],
          target: params[:target]
        )
        UI.success("iOS app built successfully: #{app_path}")
        return app_path
      end

      def self.description
        "Build the iOS app."
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.return_value
        [
          ["SHORY_IOS_APP_PATH", "The path to the built iOS App."]
        ]
      end

      def self.details
        "Installs CocoaPods dependencies and build app based on scheme and configuration."
      end

      def self.available_options
        [
          Helper::ShoryHelper.ios_project_dir,
          Helper::ShoryHelper.app_identifier,
          Helper::ShoryHelper.apple_api_key_path,
          Helper::ShoryHelper.git_url,
          Helper::ShoryHelper.match_git_branch,
          Helper::ShoryHelper.xcodeproj_path,
          Helper::ShoryHelper.app_name,
          Helper::ShoryHelper.app_environment,
          Helper::ShoryHelper.workspace,
          Helper::ShoryHelper.scheme,
          Helper::ShoryHelper.ios_target,
          Helper::ShoryHelper.configuration,
          Helper::ShoryHelper.ios_app_path_prefix
        ]
      end

      def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
