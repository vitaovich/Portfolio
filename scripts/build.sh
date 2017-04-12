#!/bin/bash
echo "Building Portfolio Web App"
mkdir deploymentFolder
cp -r src/ bs-config.server.json package.json deploymentFolder
cd deploymentFolder
mv src/index.server.html src/index.html
mv src/systemjs.config.server.js src/systemjs.config.js
mv bs-config.server.json bs-config.server.json
cd ..
