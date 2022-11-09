---
id: dkfh510xhhdkee9koyvnfc0
title: Fcitx5
desc: ''
updated: 1663610610080
created: 1663609400125
---

# Fcitx - langugae input

> https://fcitx-im.org/wiki/Install_Fcitx_5

## Install

- Search on Ubuntu apt: `apt-cache search fcitx5`
- install
  ```
  sudo apt-get install fcitx5
  ```
- Vietnamese support:
  ```
  wget http://archive.ubuntu.com/ubuntu/pool/universe/f/fcitx5-unikey/fcitx5-unikey_5.0.8-1_amd64.deb
  sudo dpkg -i fcitx5-unikey_5.0.8-1_amd64.deb
  sudo apt --fix-broken install
  ``` 
- Install FE
  ```
  sudo apt install fcitx5-frontend-gtk3
  sudo apt install fcitx-config-gtk
  ```

> https://fcitx-im.org/wiki/Input_method_engines#Vietnamese
> https://pkgs.org/search/?q=fcitx5-unikey
> https://ubuntu.pkgs.org/22.04/ubuntu-universe-amd64/fcitx5-unikey_5.0.8-1_amd64.deb.html

## Setup (ubuntu 20.04)

> https://fcitx-im.org/wiki/Setup_Fcitx_5#im-config_.28Debian.2FDebian-based.2FUbuntu.29

- Run `im-config` & select fcitx5 