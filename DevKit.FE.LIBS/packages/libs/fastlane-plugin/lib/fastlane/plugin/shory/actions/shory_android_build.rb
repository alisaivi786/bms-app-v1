require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryAndroidBuildAction < Action
      def self.run(params)
        # Increment Google Play build number and set it in the Gradle build file
        # This is necessary to ensure that the build number is unique
        # for each build uploaded to Google Play
        other_action.shory_increment_google_play_build_number(
          track: params[:track],
          api_key_path: params[:api_key_path],
          package_name: params[:package_name],
          gradle_path: params[:gradle_path]
        )

        # Clean the build directory
        other_action.gradle(
          task: "clean",
          project_dir: params[:android_project_dir]
          # gradle_path: params[:gradlew_path]
        )

        # Build the app
        other_action.gradle(
          # gradle_path: params[:gradle_path],
          task: params[:build_task],
          flavor: params[:flavor],
          build_type: "Release",
          project_dir: params[:android_project_dir]
        )

         app_path = other_action.shory_android_generate_app_path(
          app_name: params[:app_name],
          app_environment: params[:app_environment],
          gradle_path: params[:gradle_path],
          app_path_prefix: params[:app_path_prefix],
          build_task: params[:build_task]
        )

       output_path = Helper::ShoryHelper.gradle_output_path_for(params[:build_task])

        sh("mkdir -p #{params[:app_path_prefix]}")
        sh("cp #{Actions.lane_context[output_path]} #{app_path}")
        UI.success("Android app built successfully: #{app_path}")
        return app_path
      end

      def self.description
        "Build the Android app."
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.return_value
        [
          ["SHORY_ANDROID_APP_PATH", "The path to the built Android app."]
        ]
      end

      def self.details
        "Installs CocoaPods dependencies and build app based on track and favour from `app_environment`."
      end

      def self.available_options
        [
          Helper::ShoryHelper.track,
          Helper::ShoryHelper.google_api_key_path,
          Helper::ShoryHelper.android_package_name,
          Helper::ShoryHelper.gradle_path,
          Helper::ShoryHelper.android_project_dir,
          Helper::ShoryHelper.app_name,
          Helper::ShoryHelper.app_environment,
          Helper::ShoryHelper.android_app_path_prefix,
          Helper::ShoryHelper.android_flavor,
          Helper::ShoryHelper.android_build_task
        ]
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
