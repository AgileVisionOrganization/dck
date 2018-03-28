#!/bin/sh
VERSION=`cat package.json | underscore select '.version' --outfmt text`
PACK_NAME=`cat package.json | underscore select '.name' --outfmt text`
NPM_VERSION=`npm view $PACK_NAME version`

echo $PACK_NAME
echo $VERSION
echo $NPM_VERSION
if [ "$VERSION" = "$NPM_VERSION" ]
then
    echo "Package $PACK_NAME does not need to be updated"
else 
    npm publish
fi