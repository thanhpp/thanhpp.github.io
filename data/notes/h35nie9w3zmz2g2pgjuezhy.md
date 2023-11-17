
# Supervisord: A Process Control System

> http://supervisord.org/

## Install

- Ubuntu: `sudo apt install supervisor`

## Configuration files

- Folder: `/etc/supervisor/supervisord.conf`
- Files: `/etc/supervisor/conf.d/*.conf`
- Program config
  ```
  [program:<program name>]
  command=<absolute or relative>
  autostart=<true/false>
  autorestart=<true/false/unexpected>
  user=<username>
  stdout_logfile=</var/log/supervisord/...>
  stderr_logfile=</var/log/supervisord/...>
  directory=<exec folder>
  ```

## Command

- Enter the supervisord controller mode: `sudo supervisorctl`
- Get status: `sudo supervisorctl status all`
- Reload config: `sudo supervisorctl update`
    - add/remove config
    - restart affected program
- Read logs: `sudo supervisorctl tail -f <program name> [stdout|stderr]`
- Restart a service: `sudo supervisorctl restart <program name>`