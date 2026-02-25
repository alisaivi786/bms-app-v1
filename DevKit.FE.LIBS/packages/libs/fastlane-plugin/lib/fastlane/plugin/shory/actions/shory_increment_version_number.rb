require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryIncrementVersionNumberAction < Action
      def self.run(params)

        current_version = params[:current_version]
        bump_type = params[:bump_type]
        
        unless current_version.match?(/^\d+\.\d+\.\d+$/)
          UI.user_error!("Invalid current_version '#{current_version}'. Expected format: 1.0.0.")
        end

        allowed_bump_types = ["major", "minor", "patch"]
        unless allowed_bump_types.include?(bump_type)
          UI.user_error!("Invalid bump_type: '#{bump_type}'. Supported types are: #{allowed_bump_types.join(', ')}")
        end

        # Split version into parts
        version_parts = current_version.split(".").map(&:to_i)

        # Bump relevant part of the version
        case bump_type
        when "major"
          version_parts[0] += 1
          version_parts[1] = 0
          version_parts[2] = 0
        when "minor"
          version_parts[1] += 1
          version_parts[2] = 0
        when "patch"
          version_parts[2] += 1
        end

        # Create the new version string
        new_version = version_parts.join(".")
        UI.message("Version bumped successfully: #{current_version} -> #{new_version}")

        return new_version
      end

      def self.description
        "Increment the build number based on the specified bump type."
      end

      def self.authors
        ["Shory Technologies LLC"]
      end

      def self.return_value
        [
          ["SHORY_ANDROID_VERSION_NUMBER", "Version number based on bump type"]
        ]
      end

      def self.available_options
        [
          Helper::ShoryHelper.bump_type,
          FastlaneCore::ConfigItem.new(
            key: :current_version,
            description: "App current version",
          ),
        ]
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
