#!/bin/bash

OUT_PATH='./out'

# Replace references to node_modules with a cdn
echo 'Replacing references of node_modules with cdn https://unpkg.com'
sed -i 's|node_modules|https://unpkg.com|g' $OUT_PATH/index.html
echo 'index.html replaced references'

# Deploy everything to remote git repo
set -x
echo 'Starting deployment...'
if ! [[ $TRAVIS_PULL_REQUEST ]]; then
  if [[ $TRAVIS_BRANCH -eq 'master' ]]; then
      echo 'Deploying master branch'
      # Initialize a new git repo in _site, and push it to our server.
      cd out
      git init

      git remote add deploy "deploy@vitoal.com:/var/repo/vitaovich/portfolio"
      git config user.name "Travis CI"
      git config user.email "vitaliyalekhnovich@gmail.com"

      git add .
      git commit -m "Deploy"
      git push --force deploy master
      exit 1
  else
      echo 'Deployment can''t happen unless branch is master. '
  fi
fi
