
# Set up [[linux.customization.i3]] for hiDPI screen

> https://unix.stackexchange.com/questions/267885/how-do-i-scale-i3-window-manager-for-my-hidpi-display
> https://dougie.io/linux/hidpi-retina-i3wm/

## Modify ~/.Xresources & ~/.xinitrc

`~/.Xresources`
```
Xft.dpi: 196
```

`~/.xinitrc`
```
xrdb -merge ~/.Xresources
exec i3
```

## DPI

- Full HD: 96
- 2K: 128
- 4K: 192