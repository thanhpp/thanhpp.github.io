---
id: 1mt5am4uwnvwb6oeym9weke
title: Polybar
desc: ''
updated: 1661057661573
created: 1661056377835
---

# polybar is customizable status bar, integrate with i3

> https://github.com/polybar/polybar

## install

- command `sudo apt install polybar` -> **unable to locate**
- [Compile](https://github.com/polybar/polybar/wiki/Compiling)
    - Dependencies (apt)
      ```
      sudo apt install -y build-essential git cmake cmake-data pkg-config python3-sphinx python3-packaging libuv1-dev libcairo2-dev libxcb1-dev libxcb-util0-dev libxcb-randr0-dev libxcb-composite0-dev python3-xcbgen xcb-proto libxcb-image0-dev libxcb-ewmh-dev libxcb-icccm4-dev
      ```
      ```
      sudo apt install -y libxcb-xkb-dev libxcb-xrm-dev libxcb-cursor-dev libasound2-dev libpulse-dev i3-wm libjsoncpp-dev libmpdclient-dev libcurl4-openssl-dev libnl-genl-3-dev
      ```
- Compiling
    - clone the repo https://github.com/polybar/polybar (have to clone all **submodules**)
      `git clone --recursive https://github.com/polybar/polybar`
    - cd to the folder
    - run
      ```
      mkdir build
      cd build
      cmake ..
      make -j$(nproc)
      # Optional. This will install the polybar executable in /usr/local/bin
      sudo make install
      ```
- error
    - /home/thanhpp/github.com/polybar/polybar/lib/xpp does not contain a CMakeLists.txt file. Target xpp not generated
    - Didn't clone submodules -> missing file

## config

- placed in `$HOME/.config/polybar`
- soft link
