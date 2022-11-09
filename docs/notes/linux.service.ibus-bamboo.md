---
id: ctghka60xavkhyt9ow6eazd
title: Ibus Bamboo
desc: ''
updated: 1662220526387
created: 1662220473098
---

# Ibus-bamboo - Bộ gõ tiếng Việt cho Linux

> https://github.com/BambooEngine/ibus-bamboo

## Ubuntu install

```
sudo add-apt-repository ppa:bamboo-engine/ibus-bamboo
sudo apt-get update
sudo apt-get install ibus ibus-bamboo --install-recommends
ibus restart
# Đặt ibus-bamboo làm bộ gõ mặc định
env DCONF_PROFILE=ibus dconf write /desktop/ibus/general/preload-engines "['BambooUs', 'Bamboo']" && gsettings set org.gnome.desktop.input-sources sources "[('xkb', 'us'), ('ibus', 'Bamboo')]"
```