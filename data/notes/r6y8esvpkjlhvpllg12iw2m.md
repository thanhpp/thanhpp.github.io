# Start up logs

```bash
cd /etc/default
sudo nvim grub
# Remove quiet splash from GRUB_CMDLINE_LINUX_DEFAULT=""
sudo update-grub
```

> https://super-unix.com/ubuntu/ubuntu-how-to-enable-boot-messages-to-be-printed-on-screen-during-boot-up/