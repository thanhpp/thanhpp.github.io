---
id: 2gi29jkx904kfzav2vav9ab
title: Export Gpg
desc: ''
updated: 1662111768881
created: 1662111244155
---

# How to export gpg key and import it to another computer

> https://makandracards.com/makandra-orga/37763-gpg-extract-private-key-and-import-on-different-machine

## Export

1. `gpg --list-secret-keys uid`
1.  Get the key id
1. export the private key `gpg --export-secret-keys <key id> > <private key file location>.key`  

## Import

`gpg --import <private key file location>.key`