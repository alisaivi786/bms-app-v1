require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryAndroidSetVersionNumberAction < Action
      def self.run(params)
        bump_type = params[:bump_type]
        version_name = params[:custom_version_name]||nil

        current_version = other_action.shory_android_get_version_number

        if bump_type.nil? && version_name.nil? && version_name.to_s.strip.empty?
          final_version = current_version
          UI.message("No 'bump_type' or 'version_name' provided. Continuing build with current Android version: #{final_version}.")
        else
          if version_name && !version_name.to_s.strip.empty?
            final_version = version_name
            UI.message("Setting custom version number for Android: #{final_version}")
          elsif bump_type
            final_version = other_action.shory_increment_version_number(current_version: current_version, bump_type: bump_type)
            UI.message("Current Android version is #{current_version}. Incrementing to #{final_version} using bump type '#{bump_type}'.")
          end

          UI.important("Updating Android versionName in #{params[:gradle_path]} to #{final_version}")
          sh("sed -i'.old' -E 's/versionName[ \\t]*\"[^\"]*\"/versionName \"#{final_version}\"/g' #{params[:gradle_path]}")
          UI.success("Android version will be #{final_version}")
        end
      end

      def self.description
        "Set version number for Android app."
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.available_options
        [
          Helper::ShoryHelper.gradle_path,
          Helper::ShoryHelper.bump_type,
          Helper::ShoryHelper.custom_version_name,
        ]
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
