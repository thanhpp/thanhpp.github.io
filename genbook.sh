#!/bin/bash

mkdir src;
rsync -av --progress . ./src --exclude=docs/ --exclude=src/ --exclude=.gitignore --exclude=.git --exclude=genbook.sh --exclude=book.toml;
mdbook build;
rm -r src/;