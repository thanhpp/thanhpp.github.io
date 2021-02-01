#!/bin/bash

mkdir src;
rsync -av --progress . ./src --exclude=book/ --exclude=src/ --exclude=.gitignore --exclude=.git --exclude=genbook.sh --exclude=book.toml;
mdbook build;
rm -r src/;