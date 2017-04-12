#!/bin/bash
set -x
echo 'Starting deployment...'
if [[ $# -eq 0 ]]; then
    echo 'No arguments supplied Testing deployment'
    # Initialize a new git repo in _site, and push it to our server.
    cd testfolder
    git init

    git remote add deploy "deploy@138.68.55.159:/var/repo/vitaovich/portfolio"
    git config user.name "Travis CI"
    git config user.email "vitaliyalekhnovich@gmail.com"

    git add .
    git commit -m "Deploy"
    git push --force deploy master
    exit 1
elif [[ $1 == "production" ]]; then
    echo '-Production deployment selected-'

elif [[ $1 == "development" ]]; then
    echo '-Development deployment selected-'

else
    echo 'Invalid arguments supplied'
fi
