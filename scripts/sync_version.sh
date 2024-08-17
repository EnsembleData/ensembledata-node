#!/bin/sh

echo "Current version: $1"
sed -i '' "s|VERSION = \".*\"|VERSION = \"$1\"|g" src/version.js
