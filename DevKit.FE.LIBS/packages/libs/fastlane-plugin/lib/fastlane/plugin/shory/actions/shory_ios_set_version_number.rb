require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryIosSetVersionNumberAction < Action
      def self.run(params)
        bump_type = params[:bump_type]
        version_name = params[:custom_version_name]||nil

        current_version = other_action.get_version_number(
          xcodeproj: params[:xcodeproj_path], 
          target: params[:target],
        )
        
        if bump_type.nil? && version_name.nil? && version_name.to_s.strip.empty?
          final_version = current_version
          UI.message("No 'bump_type' or 'version_name' provided. Continuing build with current iOS version: #{final_version}.")
        else
          if version_name && !version_name.to_s.strip.empty?
            final_version = version_name
            other_action.increment_version_number(xcodeproj: params[:xcodeproj_path], version_number: version_name)
            UI.message("Setting custom version number for iOS: #{version_name}")
          elsif bump_type
            final_version = other_action.increment_version_number(xcodeproj: params[:xcodeproj_path], bump_type: bump_type)
            UI.message("Current iOS version is #{current_version}. Incrementing to #{final_version} using bump type '#{bump_type}'.")
          end

          UI.success("iOS version will be #{final_version}")
        end
      end

      def self.description
        "Set version number for iOS app."
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.available_options
        [
          Helper::ShoryHelper.xcodeproj_path,
          Helper::ShoryHelper.scheme,
          Helper::ShoryHelper.ios_target,
          Helper::ShoryHelper.configuration,
          Helper::ShoryHelper.bump_type,
          Helper::ShoryHelper.custom_version_name,
        ]
      end

      def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
