# Arch linux

## Install

- https://wiki.archlinux.org/title/installation_guide
- https://itsfoss.com/install-arch-linux/

## Sound card not found

> https://bbs.archlinux.org/viewtopic.php?id=262135
> https://wiki.archlinux.org/title/Advanced_Linux_Sound_Architecture#ALSA_Firmware


- Install ALSA firmware
    ```
    sudo pacman -S sof-firmware
    sudo pacman -S alsa-ucm-conf
    ```

## Freeze youtube (firefox & chrome) - Can not play video with sound

> https://bbs.archlinux.org/viewtopic.php?id=155714
> https://bbs.archlinux.org/viewtopic.php?id=274229

```
$ systemctl --user status pulseaudio
    dbus-org.bluez.service NOT FOUND ERROR
```

- Install ffmpeg

- Install vulkan: https://archlinux.org/packages/?name=vulkan-intel

- Install pipewire
    - https://www.reddit.com/r/archlinux/comments/lv5ihv/what_is_the_most_proper_way_to_replace_pulseaudio/

## Dark theme

> https://wiki.archlinux.org/title/GTK#Dark_theme_variant

- GTK
    - gtk: `gtk-application-prefer-dark-theme = true`
    - gtk4: `gsettings set org.gnome.desktop.interface color-scheme prefer-dark`

## Natural scrolling

> https://bbs.archlinux.org/viewtopic.php?id=240950

```
# /etc/X11/xorg.conf.d/40-libinput.conf || /usr/share/X11/xorg.conf.d/40-libinput.conf

Option "NaturalScrolling" "true"
```