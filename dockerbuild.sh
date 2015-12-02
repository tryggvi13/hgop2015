#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t tryggvi93/tictactoe .

echo "Done"
