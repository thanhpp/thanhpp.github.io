
# Inconsistent cursor size

## Set Sway cursor size

> https://wiki.archlinux.org/title/sway#Change_cursor_theme_and_size

- Add
  ```
  # Cursor settings
  seat seat0 xcursor_theme default 16
  ```
=> **Not fix it**

## Use Xdefaults file

> https://github.com/swaywm/sway/issues/2014

- Update the `~/.Xdefaults` file
    ```
    Xcursor.size: 16
    ``` 
=> **Not fix it**

## Update gtk settings

- terminal
  ```
  gsettings set org.gnome.desktop.interface cursor-size 16
  ```
=> **Not fix it**

- update the `~/.config/gtk3.0/settings.ini`
  ```
  gtk-cursor-theme-size=16
  ```