require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryUploadGooglePlayAction < Action
      def self.run(params)
        changelog = other_action.shory_changelog()

        other_action.supply(
          aab: params[:app_path],
          package_name: params[:package_name],
          track: params[:track],
          json_key: params[:api_key_path],
          skip_upload_metadata: true,
          skip_upload_images: true,
          skip_upload_screenshots: true,
          release_status: params[:android_release_status]
          # validate_only: true
        )
      end

      def self.description
        "Upload Android app to Google Play."
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.return_value
      end

      def self.details
        "Generates a changelog using the action `shory_changelog` and set it on the Google Play build."
      end

      def self.available_options
        [
          Helper::ShoryHelper.google_api_key_path,
          Helper::ShoryHelper.android_app_path,
          Helper::ShoryHelper.track,
          Helper::ShoryHelper.android_package_name,
          Helper::ShoryHelper.android_release_status
        ]
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
