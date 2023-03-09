---
id: qtktd7329d9m69svdgniohf
title: Corrupted Db
desc: ''
updated: 1678273325478
created: 1678250016700
---
# Issues

```
error: key "360062B960D7EDDB" could not be looked up remotely
error: database 'home_lamlng_Arch' is not valid (invalid or corrupted database (PGP signature))
```

# Fixes

- https://wiki.archlinux.org/title/Pacman/Package_signing#Cannot_import_keys
- remove the home_lamlng_Arch from /etc/pacman.conf