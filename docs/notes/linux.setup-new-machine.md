# Set up a new machine

## Set user as sudo

- Switch to an another login account
    - ctrl + alt + <F2/F12>
    - add user to the sudo group: `sudo add <username> sudo`

## Awesome WM

- Setup: https://wiki.debian.org/Awesome
    -  add `exec awesome` to your ~/.xinitrc
    - find this `rc.lua` file in `/etc/xdg/awesome/`. Copy it to `~/.config/awesome/`
- High DPI
    - https://www.reddit.com/r/awesomewm/comments/inv3p8/how_to_set_scaleresolution_of_awesomewm/?rdt=59604
- Set mouse scroll
    - Update `/usr/share/X11/xorg.conf.d/40-libinput.conf`:
        - ```
            # Match on all types of devices but joysticks
            Section "InputClass"
                    Identifier "libinput pointer catchall"
                    MatchIsPointer "on"
                    MatchDevicePath "/dev/input/event*"
                    Driver "libinput"
                    Option "NaturalScrolling" "True"
            EndSection

            ...

            Section "InputClass"
                Identifier "libinput touchpad catchall"
                MatchIsTouchpad "on"
                MatchDevicePath "/dev/input/event*"
                Driver "libinput"
                Option "NaturalScrolling" "True"
            EndSection
          ```

## Zsh setup

- Install zsh: `sudo apt install zsh`
    - change shell: `chsh -s $(which zsh)`
- Install oh-my-zsh: https://ohmyz.sh/#install
- Link (hard link)
    - custom/themes/*
    - .zshrc
    - aliases.zsh
    - my_command.zsh

## Fonts

- Ubuntu mono nerd fonts: https://www.nerdfonts.com/font-downloads
- Intel one mono: https://github.com/intel/intel-one-mono

## HiDPI Grub

> https://www.dedoimedo.com/computers/grub-hd-scaling-resolution.html

- update `/etc/default/grub`
    - ```
        GRUB_GFXMODE=640x480
        GRUB_GFXPAYLOAD=keep
        GRUB_TERMINAL=gfxterm 
      ```
- update the grub config: `sudo-update-grub`