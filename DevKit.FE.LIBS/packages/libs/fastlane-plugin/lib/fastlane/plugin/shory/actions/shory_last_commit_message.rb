require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryLastCommitMessageAction < Action
      def self.run(params)
        # Use latest commit message to generate url-safe and file-system-safe message
        last_commit_message = `git log -1 --pretty=%s`.strip
          .gsub(/[^0-9A-Za-z]/, '-') # Replaces non-alphanumeric characters with '-'
          .gsub(/-+/, '-') # Collapse multiple dashes into one
          .gsub(/^-|-$/, '') # Remove leading/trailing "-"
          .slice(0, 80) # Limit to 80 characters
        ENV["SHORY_LAST_COMMIT_MESSAGE"] = last_commit_message
        UI.success("SHORY_LAST_COMMIT_MESSAGE: #{last_commit_message}")
        return last_commit_message
      end

      def self.description
        "Create a url-safe and file-system-safe message using git latest commit."
      end

      def self.authors
        ["Shory Technologies LLC"]
      end

      def self.return_value
        [
          ["SHORY_LAST_COMMIT_MESSAGE", "url-safe and file-system-safe last commit message"]
        ]
      end

      def self.details
        "Limited to 80 characters.
Example: 
'feat(12345): some very long feature title that exceeds the max length and needs to be trimmed'
-->
'feat-12345-some-very-long-feature-title-that-exceeds-the-max-length-and-needs-to'"
      end

      def self.available_options
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
