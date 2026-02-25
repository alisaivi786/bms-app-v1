require 'fastlane_core/ui/ui'

module Fastlane
  UI = FastlaneCore::UI unless Fastlane.const_defined?(:UI)

  module Helper
    class ShoryHelper
      # class methods that you define here become available in your action
      # as `Helper::ShoryHelper.your_method`
      #

      def self.ios_project_dir
        FastlaneCore::ConfigItem.new(
          key: :ios_project_dir,
          env_name: 'SHORY_IOS_PROJECT_DIR',
          description: 'iOS project directory',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No iOS project directory given, pass using `ios_project_dir: 'path'`")
            end
            UI.user_error!("Couldn't find folder at path '#{value}'") unless File.directory?(value)
          end
        )
      end

      def self.android_project_dir
        FastlaneCore::ConfigItem.new(
          key: :android_project_dir,
          env_name: 'SHORY_ANDROID_PROJECT_DIR',
          description: 'Android project directory',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No Android project directory given, pass using `android_project_dir: 'path'`")
            end
            UI.user_error!("Couldn't find folder at path '#{value}'") unless File.directory?(value)
          end
        )
      end
      

      def self.app_identifier
        FastlaneCore::ConfigItem.new(
          key: :app_identifier,
          env_name: 'SHORY_IOS_APP_IDENTIFIER',
          description: 'App Identifier (Bundle ID)',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No App Identifier (Bundle ID) given, pass using `app_identifier: 'bundle_id'`")
            end
          end
        )
      end

      def self.app_identifiers
        FastlaneCore::ConfigItem.new(
          key: :app_identifier,
          env_name: 'SHORY_IOS_APP_IDENTIFIERS',
          description: 'App Identifiers (Bundle IDs), can be an array or a single string',
          type: Array,
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No App Identifiers (Bundle IDs) given, pass using `app_identifier: 'bundle_id1','bundle_id2'`")
            end
          end
        )
      end

      def self.xcodeproj_path
        FastlaneCore::ConfigItem.new(
          key: :xcodeproj_path,
          env_name: 'SHORY_XCODE_PROJECT_PATH',
          description: 'Xcode Project Path',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No Xcode Project Path given, pass using `xcodeproj: 'path'`")
            end
            UI.user_error!("Couldn't find file at path '#{value}'") unless File.exist?(value)
          end
        )
      end

      def self.workspace
        FastlaneCore::ConfigItem.new(
          key: :xcode_workspace_path,
          env_name: 'SHORY_XCODE_WORKSPACE_PATH',
          description: 'Xcode Workspace Path',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No Xcode Workspace Path given, pass using `workspace: 'path'`")
            end
            UI.user_error!("Couldn't find file at path '#{value}'") unless File.exist?(value)
          end
        )
      end

      def self.apple_api_key_path
        FastlaneCore::ConfigItem.new(
          key: :api_key_path,
          env_name: 'SHORY_APPLE_API_KEY_PATH',
          description: 'App Store Connect API Key Path',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No App Store Connect API Key Path given, pass using `api_key_path: 'path'`")
            end
            UI.user_error!("Couldn't find file at path '#{value}'") unless File.exist?(value)
          end
        )
      end

      def self.git_url
        FastlaneCore::ConfigItem.new(
          key: :git_url,
          env_name: 'SHORY_MATCH_GIT_URL',
          description: 'Git URL for match to fetch certificates and profiles',
          is_string: true
        )
      end

      def self.match_git_branch
        FastlaneCore::ConfigItem.new(
          key: :match_git_branch,
          env_name: 'SHORY_MATCH_GIT_BRANCH',
          description: 'Git Branch for match to fetch certificates and profiles',
          is_string: true,
          optional:true,
          default_value: 'master'
        )
      end

      def self.app_name
        FastlaneCore::ConfigItem.new(
          key: :app_name,
          env_name: 'SHORY_APP_NAME',
          optional: true,
          default_value: 'app',
          description: 'App Name'
        )
      end

      def self.app_environment
        FastlaneCore::ConfigItem.new(
          key: :app_environment,
          env_name: 'SHORY_APP_ENVIRONMENT',
          description: 'App Environment',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No App Environment given, pass using `app_environment: 'environment'`")
            end
          end
        )
      end

      def self.ios_app_path_prefix
        # This is the prefix for the app path, used to create the app path
        # For example, if you want app path to be /Users/user/Projects/..., the prefix is /Users/user/Projects
        FastlaneCore::ConfigItem.new(
          key: :app_path_prefix,
          env_name: 'SHORY_IOS_APP_PATH_PREFIX',
          description: 'App Path prefix',
          optional: true,
          default_value: '.',
          is_string: true
        )
      end

      def self.android_app_path_prefix
        # This is the prefix for the app path, used to create the app path
        # For example, if you want app path to be /Users/user/Projects/..., the prefix is /Users/user/Projects
        FastlaneCore::ConfigItem.new(
          key: :app_path_prefix,
          env_name: 'SHORY_ANDROID_APP_PATH_PREFIX',
          description: 'App Path prefix',
          optional: true,
          default_value: '.',
          is_string: true
        )
      end

      def self.ios_app_path
        FastlaneCore::ConfigItem.new(
          key: :app_path,
          env_name: 'SHORY_IOS_APP_PATH',
          description: 'iOS App Path',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No iOS App Path given, pass using `app_path: 'path'`")
            end
            UI.user_error!("Couldn't find file at path '#{value}'") unless File.exist?(value)
          end
        )
      end

      def self.android_app_path
        FastlaneCore::ConfigItem.new(
          key: :app_path,
          env_name: 'SHORY_ANDROID_APP_PATH',
          description: 'Android App Path',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("Android App Path given, pass using `app_path: 'path'`")
            end
            UI.user_error!("Couldn't find file at path '#{value}'") unless File.exist?(value)
          end
        )
      end

      def self.scheme
        FastlaneCore::ConfigItem.new(
          key: :scheme,
          env_name: 'SHORY_IOS_SCHEME',
          description: 'iOS App Scheme',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No iOS App Scheme given, pass using `scheme: 'scheme'`")
            end
          end
        )
      end

      def self.ios_target
        FastlaneCore::ConfigItem.new(
          key: :target,
          env_name: 'SHORY_IOS_TARGET',
          description: 'iOS App Target',
          optional: true,
        )
      end

      def self.configuration
        FastlaneCore::ConfigItem.new(
          key: :configuration,
          env_name: 'SHORY_IOS_CONFIGURATION',
          description: 'iOS App Configuration',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No iOS App Configuration given, pass using `configuration: 'configuration'`")
            end
          end
        )
      end

      def self.gradle_path
        FastlaneCore::ConfigItem.new(
          key: :gradle_path,
          env_name: 'SHORY_GRADLE_PATH',
          description: 'Gradle Path',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No Gradle Path given, pass using `gradle_path: 'path'`")
            end
            UI.user_error!("Couldn't find file at path '#{value}'") unless File.exist?(value)
          end
        )
      end

      def self.google_api_key_path
        FastlaneCore::ConfigItem.new(
          key: :api_key_path,
          env_name: 'SHORY_GOOGLE_API_KEY_PATH',
          description: 'Google Play API Key Path',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No Google Play API Key Path given, pass using `api_key_path: 'path'`")
            end
            UI.user_error!("Couldn't find file at path '#{value}'") unless File.exist?(value)
          end
        )
      end

      def self.track
        FastlaneCore::ConfigItem.new(
          key: :track,
          env_name: 'SHORY_ANDROID_TRACK',
          description: 'Android Track',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No Android Track) given, pass using `track: 'track'`")
            end
          end
        )
      end

      def self.custom_version_name
        FastlaneCore::ConfigItem.new(
          key: :custom_version_name,
          description: 'Custom version name',
          optional: true
        )
      end

      def self.bump_type
        FastlaneCore::ConfigItem.new(
          key: :bump_type,
          description: 'Bump type',
          optional: true,
          verify_block: proc do |value|
            allowed_values = ["major", "minor", "patch"]
            unless allowed_values.include?(value)
              UI.user_error!("Invalid bump_type '#{value}'. Valid values are: #{allowed_values.join(', ')}")
            end
          end
        )
      end

      def self.build_number
        FastlaneCore::ConfigItem.new(
          key: :build_number,
          description: 'Build Number',
          type: Integer,
          verify_block: proc do |value|
            unless value
              UI.user_error!("No Build Number given, pass using `build_number: 'number'`")
            end
          end
        )
      end

      def self.android_package_name
        FastlaneCore::ConfigItem.new(
          key: :package_name,
          env_name: 'SHORY_ANDROID_PACKAGE_NAME',
          description: 'Android Package Name',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No Android Package Name given, pass using `package_name: 'name'`")
            end
          end
        )
      end

      def self.android_flavor
        FastlaneCore::ConfigItem.new(
          key: :flavor,
          env_name: 'SHORY_ANDROID_FLAVOR',
          description: 'Android Flavor',
          verify_block: proc do |value|
            unless value && !value.empty?
              UI.user_error!("No Android Flavor given, pass using `flavor: 'name'`")
            end
          end
        )
      end

      def self.android_build_task
        FastlaneCore::ConfigItem.new(
          key: :build_task,
          env_name: 'SHORY_ANDROID_BUILD_TASK',
          description: 'Android App Build Task',
          optional:true,
          default_value: 'bundle',
          verify_block: proc do |value|
            allowed_values = ["bundle", "assemble"]
            unless allowed_values.include?(value)
              UI.user_error!("Invalid android_build_task '#{value}'. Valid values are: #{allowed_values.join(', ')}")
            end
          end
        )
      end

      def self.android_release_status
        FastlaneCore::ConfigItem.new(
          key: :android_release_status,
          env_name: 'SHORY_ANDROID_RELEASE_STATUS',
          description: 'Android release status',
          optional: true,
          verify_block: proc do |value|
            allowed_values = ["completed", "draft", "halted", "inProgress"]
            unless allowed_values.include?(value)
              UI.user_error!("Invalid android_release_status '#{value}'. Valid values are: #{allowed_values.join(', ')}")
            end
          end
        )
      end

      def self.slack_attachments(environment:, version:, build:)
        return {
          fields: [{
            title: "",
            value: "*#{self.last_commit_message}*",
            short: false
          }, {
            title: "",
            value: "_#{version}_#{build}_#{environment.downcase}_",
            short: false
          }]
        }
      end

      def self.last_commit_message
        `git log -1 --pretty=%B`.lines.first.strip # Only the first line
      end
      
      def self.gradle_output_path_for(task)
        {
          'assemble' =>  :GRADLE_APK_OUTPUT_PATH,
          'bundle' => :GRADLE_AAB_OUTPUT_PATH
        }[task]
      end

      def self.gradle_extension_for(task)
        {
          'assemble' =>  'apk',
          'bundle' => 'aab'
        }[task]
      end
    end
  end
end
