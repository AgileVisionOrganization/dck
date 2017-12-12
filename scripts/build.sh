#!/bin/bash

lerna run test
lerna publish -m "bump versions [ci skip]" --conventional-commits --yes --skip-git