
# Set GTK dark theme

> https://unix.stackexchange.com/questions/655790/how-to-switch-to-system-wide-dark-theme-in-i3-or-sway

- Modify the System default theme
- update GTK 3 settings
    - edit `~/.config/gtk-3.0/settings.ini`
    - Add
      ```
      [Settings]
      gtk-application-prefer-dark-theme=1
      ```
- Set gnome interface
  ```
  gsettings set org.gnome.desktop.interface gtk-theme 'Adwaita-dark'
  ```