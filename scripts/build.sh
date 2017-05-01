#!/bin/bash
echo 'Building Portfolio Web App'
OUT_PATH='./out'
SRC_PATH='./src'

echo 'Removing previous build.'
rm -r $OUT_PATH
echo $1
{ echo 'COMPILING TypeScript USING'; tsc -v; }
if [ $1 = "-w" ];  then
  echo 'Linking source html, css, js, and ico files'
  ln -s $SRC_PATH $OUT_PATH
  tsc -w
else
  mkdir $OUT_PATH
  echo 'Copying source html, css, js, and ico files'
  cd $SRC_PATH
  find app -type f | grep .js | xargs -i rm {}
  rm main.js
  rm main.js.map
  find . -type f | grep .ico | xargs -i cp {} ../$OUT_PATH --parents
  find . -type f | grep .html | xargs -i cp {} ../$OUT_PATH --parents
  find . -type f | grep .css | xargs -i cp {} ../$OUT_PATH --parents
  find . -type f | grep .js | xargs -i cp {} ../$OUT_PATH --parents
  cd ..
  tsc --diagnostics --listEmittedFiles --listFiles
  echo 'FINISHED COMPILING.'
fi
