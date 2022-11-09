---
id: o1lmi4rif7tlnkle0ckp2gp
title: Systemd
desc: ''
updated: 1661420028102
created: 1661361194018
---

# Systemd system and service manager

> https://wiki.debian.org/systemd
> https://www.computernetworkingnotes.com/linux-tutorials/systemd-unit-configuration-files-explained.html

## Install

```
sudo apt update
sudo apt install systemd
```

## Setup a service

> https://www.shubhamdipt.com/blog/how-to-create-a-systemd-service-in-linux/

1. cd `/etc/systemd/system`
1. create a config file `<service-name>.service`
    ```
    [Unit]
    Description=<description about this service>

    [Service]
    User=<user e.g. root>
    WorkingDirectory=<directory_of_script e.g. /root>
    ExecStart=<script which needs to be executed>
    Restart=always
    StandardError=journal
    StandardOutput=journal
    StandardInput=null

    [Install]
    WantedBy=multi-user.target
    ```
1. reload all service `sudo systemctl daemon-reload`
1. start your service `sudo systemctl start <service-name>.service`

## Other commands

- Stop a service (not on every boot): `sudo systemctl stop <service-name>.service`
- Check status `sudo systemctl status <service-name>.service`
- Enable every boot `sudo systemctl enable <service-name>.service`
- Disable every boot `sudo systemctl disable <service-name>.service`

## Read logs

> https://unix.stackexchange.com/questions/225401/how-to-see-full-log-from-systemctl-status-service

```
journalctl -u <service-name>.service
```

- Must add to the config 
    ```
    StandardError=journal
    StandardOutput=journal
    ```

