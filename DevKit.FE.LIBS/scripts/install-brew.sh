#!/bin/bash

# This script installs dependencies using Homebrew.

set -euo pipefail

# Define the list of dependencies
dependencies=(
  "xcodesorg/made/xcodes"
  "shellcheck"
  "jq"
  # proto dependencies below 
  "git" 
  "unzip"
  "gzip"
  "xz"
)

# Install Homebrew if it's not already installed
if ! command -v brew &> /dev/null; then
  echo "Homebrew not found. Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Update Homebrew
echo "Updating Homebrew..."
brew update

# Install dependencies
echo "Installing dependencies..."
for package in "${dependencies[@]}"; do
  if brew list -1 | grep -q "^${package}\$"; then
    echo "$package is already installed"
  else
    brew install "$package"
  fi
done

echo "All dependencies are installed."