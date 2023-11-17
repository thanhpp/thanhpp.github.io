
# Update the grub resolution

- grub config file: `/etc/default/grub`
- Add
  ```
  GRUB_GFXMODE=640x480
  GRUB_GFXPAYLOAD=keep
  GRUB_TERMINAL=gfxterm
  ```
- update the grub menu
  ```
  sudo update-grub
  ```
- Explain
    - GFXMODE: the resolution of the grub menu 
    - GFXPAYLOAD: use the same parameters as defined during the initial startup
    - TERMINAL: use a graphical device