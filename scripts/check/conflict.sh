#!/usr/bin/env bash

# Check for merge conflicts
echo "Step1: check for merge conflicts"

# Tested on Linux and Mac

# Simple check for merge conflics
conflicts=`git diff --cached --name-only -G"<<<<<|=====|>>>>>"`


# Something went wrong
if [[ -n "$conflicts" ]]; then
  echo
  echo "Unresolved merge conflicts in these files:"

  for conflict in $conflicts; do
    echo $conflict
  done;

  exit 1;
fi

exit 0