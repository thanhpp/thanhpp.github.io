
> https://askubuntu.com/questions/1122513/how-to-add-natural-inverted-mouse-scrolling-in-i3-window-manager


- Edit `/usr/share/X11/xorg.conf.d/40-libinput.conf`
    - Mouse
      ```
      # Match on all types of devices but joysticks
        Section "InputClass"
                Identifier "libinput pointer catchall"
                MatchIsPointer "on"
                MatchDevicePath "/dev/input/event*"
                Driver "libinput"
                Option "NaturalScrolling" "True"
        EndSection
      ```
    - Touchpad
      ```
        Section "InputClass"
            Identifier "libinput touchpad catchall"
            MatchIsTouchpad "on"
            MatchDevicePath "/dev/input/event*"
            Driver "libinput"
            Option "NaturalScrolling" "True"
        EndSection
      ```ode