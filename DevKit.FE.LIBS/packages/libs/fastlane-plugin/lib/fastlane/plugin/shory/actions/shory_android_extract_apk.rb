require 'fastlane/action'
require_relative '../helper/shory_helper'

module Fastlane
  module Actions
    class ShoryAndroidExtractApkAction < Action
      def self.run(params)

        aab_path = other_action.shory_android_generate_app_path( 
          app_name: params[:app_name],
          app_environment: params[:app_environment],
          gradle_path: params[:gradle_path],
          app_path_prefix: params[:app_path_prefix],
          build_task: 'bundle'
        )
      
        apk_path = other_action.shory_android_generate_app_path(
          app_name: params[:app_name],
          app_environment: params[:app_environment],
          gradle_path: params[:gradle_path],
          app_path_prefix: params[:app_path_prefix],
          build_task: 'assemble'
        )

        keystore_args = ""
        if params[:keystore_path] && params[:keystore_alias] && params[:keystore_password] && params[:key_password]
          keystore_args = <<~KEYS
            --ks=#{params[:keystore_path]} \
            --ks-key-alias=#{params[:keystore_alias]} \
            --ks-pass=pass:#{params[:keystore_password]} \
            --key-pass=pass:#{params[:key_password]}
          KEYS
        end

        sh <<-SCRIPT

          bundletool build-apks \
            --bundle=#{aab_path} \
            --output=./universal.apks \
            --mode=universal \
            #{keystore_args}

          unzip universal.apks -d .
          mv universal.apk #{apk_path}
        SCRIPT

        return apk_path
      end


      def self.description
        "Extract APK from bundle build"
      end

       def self.return_value
        [
          ["SHORY_ANDROID_APK_PATH", "The path to the extracted APK."]
        ]
      end

      def self.authors
        ['Shory Technologies LLC']
      end

      def self.available_options
        [
          Helper::ShoryHelper.app_name,
          Helper::ShoryHelper.app_environment,
          Helper::ShoryHelper.gradle_path,
          Helper::ShoryHelper.android_app_path_prefix,
          FastlaneCore::ConfigItem.new(key: :keystore_path, optional: true, type: String),
          FastlaneCore::ConfigItem.new(key: :keystore_alias, optional: true, type: String),
          FastlaneCore::ConfigItem.new(key: :keystore_password, optional: true, type: String),
          FastlaneCore::ConfigItem.new(key: :key_password, optional: true, type: String),
        ]
      end

      def self.is_supported?(platform)
        platform == :android
      end

    end
  end
end
