---
id: vvuvc14wq7aayq2axvblvkh
title: Alacritty
desc: ''
updated: 1662139783210
created: 1661065512347
---

# Alacritty: A cross-platform, OpenGL terminal emulator.

> https://github.com/alacritty/alacritty

## Install

- install RUST [[programing.rust.install]]
- Dependencies
  ```
  sudo apt-get install cmake pkg-config libfreetype6-dev libfontconfig1-dev libxcb-xfixes0-dev libxkbcommon-dev python3
  ```
- clone the repo
- build by cargo
  ```
  cargo build --release
  ```
- update terminfo
  ```
  sudo tic -xe alacritty,alacritty-direct extra/alacritty.info
  ```
- desktop entry
  ```
    sudo cp target/release/alacritty /usr/local/bin # or anywhere else in $PATH
    sudo cp extra/logo/alacritty-term.svg /usr/share/pixmaps/Alacritty.svg
    sudo desktop-file-install extra/linux/Alacritty.desktop
    sudo update-desktop-database
  ```

## Set as default terminal

```
sudo update-alternatives --install /usr/bin/x-terminal-emulator x-terminal-emulator /usr/local/bin/alacritty 50
sudo update-alternatives --config x-terminal-emulator
```

## Config

`$HOME/.config/alacritty`