#!/bin/bash
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
