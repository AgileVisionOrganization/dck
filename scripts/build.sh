#!/bin/bash

lerna run test
[ -z "$TRAVIS_TAG" ] &&  lerna publish -m "bump versions [ci skip]" --conventional-commits --yes --skip-git