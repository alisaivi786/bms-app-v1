module Fastlane
  module Shory
    class IOSConfig
      attr_reader :bundle_id, :scheme, :configuration,:target

      def initialize(bundle_id:, scheme:, configuration:, target:)
        @bundle_id = bundle_id
        @scheme = scheme
        @configuration = configuration
        @target = target
      end
    end

    class AndroidConfig
      attr_reader :package_name, :flavour

      def initialize(package_name:, flavour:)
        @package_name = package_name
        @flavour = flavour
      end
    end

    class EnvConfig
      attr_reader :envs

      def initialize(envs:)
        unless envs.is_a?(Hash)
          raise ArgumentError, "Expected envs to be a Hash, got #{envs.class}"
        end
        @envs = envs
      end

      # Retrieve values by environment
      def get(env)
        raise ArgumentError, "Environment not specified" unless env
        normalized = env.upcase.to_sym
        unless @envs.key?(normalized)
          available = @envs.keys.map(&:to_s)
          raise ArgumentError, "Invalid environment: \"#{env}\" - Available: #{available}"
        end  
        @envs[normalized]
      end
    end
  end
end
