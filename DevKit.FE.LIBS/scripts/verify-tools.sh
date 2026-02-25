#!/bin/bash
set -e

# Detect --ci flag
SKIP_PROTO=0
if [[ "$1" == "--ci" ]]; then
  SKIP_PROTO=1 # Skip proto version check in CI
fi

# Detect if running in Azure Pipelines
if [[ -n "$TF_BUILD" ]]; then
  SKIP_PROTO=1 # Skip proto version check in Azure Pipelines
fi

# Read expected versions from .prototools
EXPECTED_NODE_VERSION=$(awk -F' *= *' '/^node *=/ { gsub(/"/, "", $2); print $2 }' .prototools)
EXPECTED_RUBY_VERSION=$(awk -F' *= *' '/^ruby *=/ { gsub(/"/, "", $2); print $2 }' .prototools)
EXPECTED_PROTO_VERSION=$(awk -F' *= *' '/^proto *=/ { gsub(/"/, "", $2); print $2 }' .prototools)

# Read expected pnpm version from package.json
EXPECTED_PNPM_VERSION=$(jq -r '.packageManager' package.json | cut -d'@' -f2)

# Read actual installed versions
ACTUAL_NODE_VERSION=$(node -v | sed 's/^v//')
ACTUAL_RUBY_VERSION=$(ruby -e 'puts RUBY_VERSION')
ACTUAL_PNPM_VERSION=$(pnpm -v)
ACTUAL_PROTO_VERSION=$(proto --version | awk '{print $2}')

# Print versions
echo "--- Tooling Versions ---"
echo "Expected Node:  $EXPECTED_NODE_VERSION | Actual Node:  $ACTUAL_NODE_VERSION"
echo "Expected PNPM:  $EXPECTED_PNPM_VERSION | Actual PNPM:  $ACTUAL_PNPM_VERSION"
echo "Expected Ruby:  $EXPECTED_RUBY_VERSION | Actual Ruby:  $ACTUAL_RUBY_VERSION"
if [[ "$SKIP_PROTO" -eq 0 ]]; then
  echo "Expected Proto: $EXPECTED_PROTO_VERSION | Actual Proto: $ACTUAL_PROTO_VERSION"
else
  echo "Proto version check skipped (CI mode)"
fi
echo

# Validate versions
fail=0

if [ "$EXPECTED_NODE_VERSION" != "$ACTUAL_NODE_VERSION" ]; then
  echo "❌ Node.js version mismatch!"
  fail=1
fi

if [ "$EXPECTED_PNPM_VERSION" != "$ACTUAL_PNPM_VERSION" ]; then
  echo "❌ PNPM version mismatch!"
  fail=1
fi

if [ "$EXPECTED_RUBY_VERSION" != "$ACTUAL_RUBY_VERSION" ]; then
  echo "❌ Ruby version mismatch!"
  fail=1
fi

if [[ "$SKIP_PROTO" -eq 0 && "$EXPECTED_PROTO_VERSION" != "$ACTUAL_PROTO_VERSION" ]]; then
  echo "❌ Proto CLI version mismatch!"
  fail=1
fi

if [ "$fail" -eq 1 ]; then
  echo
  echo "❌ One or more tooling versions mismatch. Please fix!"
  exit 1
fi

echo "✅ All versions match."