# 🚧 Tooling Governance <!-- omit from toc -->

📅 **Last updated**: `2025-05-01`

Defines mandatory tooling and practices for consistent development environments.

⚠️ **All developers are required to read and follow the governance guidelines below.**

## 🧭 Table of Contents <!-- omit in toc -->
- [⚙️ Node \& PNPM Version Management](#️-node--pnpm-version-management)
  - [📜 Policy Summary](#-policy-summary)
  - [🔄 Required Setup Steps](#-required-setup-steps)
  - [🔍 Validating Setup](#-validating-setup)
- [💎 Ruby Version Management](#-ruby-version-management)
  - [📜 Policy Summary](#-policy-summary-1)
  - [🔄 Required Setup Steps](#-required-setup-steps-1)
  - [🔍 Validating Setup](#-validating-setup-1)
  - [✅ Running Ruby Commands Safely](#-running-ruby-commands-safely)
- [🆘 Troubleshooting](#-troubleshooting)
- [Update History](#update-history)

## ⚙️ Node & PNPM Version Management

To ensure consistent development environments and avoid **“works on my machine”** issues, all developers **must** use the same Node & PNPM version.

### 📜 Policy Summary

1. `Node` and `pnpm` are managed by [proto](https://moonrepo.dev/proto).
2. The required versions are centrally defined in `.prototools`.
3. The Node version used is the same available by default in the [Azure DevOps macOS 15 image](https://github.com/actions/runner-images/blob/main/images/macos/macos-15-arm64-Readme.md).
4. proto is **not** currently installed in our CI pipelines. The Node version **must** be kept in sync with the version used on Azure DevOps.
5. All installations and setups must go through `scripts/bootstrap.sh`.
6. All node dependencies **must be pinned** when installed using `-E` option.
7. All dependencies not required in the final product must be installed as development dependencies using `-D` option.

### 🔄 Required Setup Steps

All developers must:

1. Install Proto if not already installed. This is handled automatically by the bootstrap script:
```bash
./scripts/bootstrap.sh # or pnpm bootstrap
```

### 🔍 Validating Setup

Make sure `proto` comes first in your `PATH`, then:

```bash
node -v    # should match proto-configured version
pnpm -v    # should match proto-configured version
which node # should resolve to proto shim path, /Users/<username>/.proto/shims/node
which pnpm # should resolve to proto shim path, /Users/<username>/.proto/shims/pnpm
```

## 💎 Ruby Version Management

To ensure consistent development environments and avoid **“works on my machine”** issues, all developers **must** use the same Ruby & gem versions.

### 📜 Policy Summary

1. `Ruby` version is managed by [proto](https://moonrepo.dev/proto).
2. The required version is centrally defined in `.prototools`.
3. iOS and Android folders have a `.ruby-version` that matches the version in `.prototools` to support the version management that ships with Azure DevOps.
4. All Ruby dependencies **must be locked** and via the project's `Gemfile`.
5. **All Ruby commands must be run via** `bundle exec` to ensure dependency consistency across machines.
6. The Ruby version used is the same available by default in the [Azure DevOps macOS 15 image](https://github.com/actions/runner-images/blob/main/images/macos/macos-15-arm64-Readme.md).
7. All installations and setups must go through `scripts/bootstrap.sh`.

### 🔄 Required Setup Steps

All developers must:

1. Install Proto if not already installed. This is handled automatically by the bootstrap script:
```bash
./scripts/bootstrap.sh # or pnpm bootstrap
```

### 🔍 Validating Setup

Make sure `proto` comes first in your `PATH`, then:

```bash
ruby -v    # should match proto-configured version
which ruby # should resolve to proto shim path, /Users/<username>/.proto/shims/ruby
```

### ✅ Running Ruby Commands Safely

Always run `Fastlane`, `CocoaPods`, and **any** Ruby script with `bundle exec` to ensure you’re using the correct dependency versions:

```bash
# Good:
bundle exec fastlane <lane>

# Good:
bundle exec pod install

# ❌ Bad: This uses global or system gems and may cause version conflicts
pod install
```

## 🆘 Troubleshooting

1. Make sure you’re using a Unix-like shell (e.g. `zsh` or `bash`).
2. Ensure that `proto` shims are first in your `$PATH` to guarantee you’re using the correct, project-specified versions of Node.js and PNPM.
3. Check your shell profile for proto config:

        export PROTO_HOME="$HOME/.proto";
        export PATH="$PROTO_HOME/shims:$PROTO_HOME/bin:$PATH";
        
   
4. Always run Ruby command using `bundle exec` to use the project's version specified in the `Gemfile`.

## Update History

- `2025-04-23` First version.
- `2025-04-25` Changed from Development to Tooling Governance.
- `2025-04-28` Add Update History.
- `2025-05-01` Add Troubleshooting.