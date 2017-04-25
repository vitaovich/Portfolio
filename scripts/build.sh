#!/bin/bash
echo 'Building Portfolio Web App'
OUT_PATH='./out'
SRC_PATH='./src'

echo 'Removing previous build.'
mkdir $OUT_PATH
rm -r $OUT_PATH/*

echo 'Copying source html, css, js, and ico files'
cd $SRC_PATH
find . -type f | grep .ico | xargs -i cp {} ../$OUT_PATH --parents
find . -type f | grep .html | xargs -i cp {} ../$OUT_PATH --parents
find . -type f | grep .css | xargs -i cp {} ../$OUT_PATH --parents
find . -type f | grep .js | xargs -i cp {} ../$OUT_PATH --parents
cd ..

{ echo 'COMPILING TypeScript USING'; tsc -v; }
if [ "$1" == "-w" ]; then
  tsc -w
else
  tsc --diagnostics --listEmittedFiles --listFiles
  echo 'FINISHED COMPILING.'
fi
