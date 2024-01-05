---
id: d5h4dltxgc6ilwo374eeq7b
title: Permission
desc: ''
updated: 1703867345460
created: 1703866661971
---

## Grant sudo to an user

- login to super user: `su --login`
- install sudo `apt install sudo`
- add user to sudo 
    - `adduser <username> sudo`
    - or `usermod -a -G sudo <username>`
- reboot the computer