#!/bin/bash

OUT_PATH='./out'
# Remove test Files
echo 'Removing spec files'
spec_files=$( find ./out -type f | grep .spec.js )
echo $spec_files
rm $spec_files
echo 'Finished removing spec files'

# Replace references to node_modules with a cdn
echo 'Replacing references of node_modules with cdn https://unpkg.com'
sed -i 's|node_modules|https://unpkg.com|g' $OUT_PATH/index.html
echo 'index.html replaced references'
sed -i 's|node_modules|https://unpkg.com|g' $OUT_PATH/systemjs.config.js
echo 'systemjs.config.js replaced references'

# Deploy everything to remote git repo
set -x
echo 'Starting deployment...'
if [[ $TRAVIS_BRANCH -eq 'master' ]]; then
    echo 'Deploying master branch'
    # Initialize a new git repo in _site, and push it to our server.
    cd out
    git init

    git remote add deploy "deploy@138.68.55.159:/var/repo/vitaovich/portfolio"
    git config user.name "Travis CI"
    git config user.email "vitaliyalekhnovich@gmail.com"

    git add .
    git commit -m "Deploy"
    git push --force deploy master
    exit 1
else
    echo 'Deployment can''t happen unless branch is master. '
fi
