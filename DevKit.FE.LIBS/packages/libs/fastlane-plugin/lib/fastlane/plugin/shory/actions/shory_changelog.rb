require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryChangelogAction < Action
      def self.run(params)
        other_action.changelog_from_git_commits(
          pretty: "- %s",
          match_lightweight_tag: false,
          merge_commit_filtering: "exclude_merges"
        )
      
        # Get branch from Azure DevOps, fallback to local branch if not found
        branch_name = ENV["BUILD_SOURCEBRANCH"]&.sub("refs/heads/", "") || 
                      `git rev-parse --abbrev-ref HEAD`.strip rescue "unknown"

        changelog = "Branch: #{branch_name}\n" + (lane_context[SharedValues::FL_CHANGELOG] || "No changelog available")
        ENV["SHORY_CHANGELOG"] = changelog
        UI.success("SHORY_CHANGELOG: #{changelog}")
        return changelog
      end

      def self.description
        "Create a changelog using git commit messages up to latest tag."
      end

      def self.authors
        ["Shory Technologies LLC"]
      end

      def self.return_value
        [
          ["SHORY_CHANGELOG", "Changelog with branch name and commit messages"]
        ]
      end

      def self.details
        "Includes branch name."
      end

      def self.available_options
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
