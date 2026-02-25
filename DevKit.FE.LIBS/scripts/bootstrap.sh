#!/usr/bin/env bash

# This scripts install tooling dependencies for the project.

set -euo pipefail

echo "🔧 Bootstrapping your dev environment..."

echo "📦 Installing system dependencies with Homebrew..."
. scripts/install-brew.sh

echo "📦 Installing node dependencies with proto..."
. scripts/install-proto.sh

# Load proto before shell restart.
export PROTO_HOME="$HOME/.proto";
export PATH="$PROTO_HOME/shims:$PROTO_HOME/bin:$PATH";
proto install

echo "📦 Installing project dependencies with pnpm..."
pnpm install

echo "✅ All set! You're ready to start developing 🎉. Please restart your terminal to apply changes."