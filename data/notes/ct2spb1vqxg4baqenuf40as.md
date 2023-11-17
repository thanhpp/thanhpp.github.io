
# Sway - i3-compatible Wayland compositor

> https://github.com/swaywm/sway

- [Sway - i3-compatible Wayland compositor](#sway---i3-compatible-wayland-compositor)
  - [Install](#install)
  - [Config](#config)
  - [HiDPI](#hidpi)
    - [Application support](#application-support)
  - [Natural scrolling](#natural-scrolling)

## Install 

```
sudo apt install sway
```

## Config

> Compatible with i3wm

- location: `~/.config/sway/config`

## HiDPI

> https://github.com/swaywm/sway/wiki#hidpi

- show output settings
  ```
  swaymsg -t get_output
  ```

```
output <id> <config
```

### Application support

- already support:
  - telegram-desktop
  - alacrity 
- Chrome:
  - chrome://flags
  - Preferred Ozone platform => Wayland
- Vscode
  - command flags:
    - --enable-features=UseOzonePlatform --ozone-platform=wayland  
    - --ozone-platform-hint=auto
    - --enable-features=WaylandWindowDecorations
  - https://wiki.archlinux.org/title/Visual_Studio_Code#Running_natively_under_Wayland  

## Natural scrolling

> https://wiki.archlinux.org/title/sway

- get inputs
  ```
  swaymsg -t get_inputs
  ```
- edit the config file
  ```
  input type:touchpad {
    tap enabled
    natural_scroll enabled
  }
  ```