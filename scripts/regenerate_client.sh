#!/bin/sh
node codegen/main.js
npx prettier . --write
