#!/bin/bash
echo 'Building Portfolio Web App'
SRC_PATH='./src'
OUT_PATH='./out'

if [ $1 = "-w" ];  then
  tsc -p src/ -w
else
  { echo 'COMPILING USING AOT ANGULAR'; }
  node_modules/.bin/ngc -p tsconfig-aot.json
  node_modules/.bin/rollup -c rollup-config.js
  node copy-dist-files.js
  find $SRC_PATH -type f | grep .ico | xargs -i cp {} ./$OUT_PATH --parents
  find $SRC_PATH -type f | grep .css | xargs -i cp {} ./$OUT_PATH --parents
  cp -R $SRC_PATH/api $OUT_PATH/$SRC_PATH
  cp -R $SRC_PATH/assets $OUT_PATH/$SRC_PATH
  cp -R $SRC_PATH/index-aot.html $OUT_PATH/$SRC_PATH/index.html
  echo 'FINISHED COMPILING.'
fi
